package session

import (
	"errors"
	"geeorm/clause"
	"reflect"
)

func (s *Session) Where(desc string, args ...interface{}) *Session {
	s.clause.Set(clause.WHERE, append([]interface{}{desc}, args...)...)
	// Set 的第二个参数为可变参数，不能直接写成下列形式
	// s.clause.Set(clause.WHERE, desc, args...)
	return s
}

func (s *Session) Limit(n int) *Session {
	s.clause.Set(clause.LIMIT, n)
	return s
}

func (s *Session) Insert(values ...interface{}) (int64, error) {
	recordValues := make([]interface{}, 0)
	for _, value := range values {
		table := s.Model(value).RefTable()
		s.clause.Set(clause.INSERT, table.Name, table.FieldNames)
		recordValues = append(recordValues, table.RecordValues(value))
	}

	s.clause.Set(clause.VALUES, recordValues...)
	sql, vars := s.clause.Build(clause.INSERT, clause.VALUES)
	result, err := s.Raw(sql, vars...).Exec()
	if err != nil {
		return 0, err
	}

	return result.RowsAffected()
}

func (s *Session) Get(value interface{}) error {
	// 获取类型
	dest := reflect.Indirect(reflect.ValueOf(value))
	table := s.Model(reflect.New(dest.Type()).Interface()).RefTable()

	// 构造查询
	s.clause.Set(clause.SELECT, table.Name, table.FieldNames)
	sql, vars := s.clause.Build(clause.SELECT, clause.WHERE, clause.ORDERBY, clause.LIMIT)
	row := s.Raw(sql, vars...).QueryRow()

	// 解析结果
	var values []interface{}
	for _, name := range table.FieldNames {
		// dest.FieldByName() 获取到结构体中各个字段的信息 Addr()指向具体地址
		values = append(values, dest.FieldByName(name).Addr().Interface())
	}
	// rows.Scan(values...) 将各个字段匹配对应的值
	if err := row.Scan(values...); err != nil {
		return err
	}
	return nil
}

func (s *Session) Find(values interface{}) error {
	destSlice := reflect.Indirect(reflect.ValueOf(values))
	// 通过 Elem 方法可以获取到元素 Array, Chan, Map, Ptr, Slice 对应的类型
	destType := destSlice.Type().Elem()
	table := s.Model(reflect.New(destType).Elem().Interface()).RefTable()

	// select (?, ?, ...) from table.Name    (table.FieldName...)
	s.clause.Set(clause.SELECT, table.Name, table.FieldNames)
	// 如果未进行前置链式调用, Where / Order by / Limit 里面是没有内容的
	sql, vars := s.clause.Build(clause.SELECT, clause.WHERE, clause.ORDERBY, clause.LIMIT)
	rows, err := s.Raw(sql, vars...).QueryRows()
	if err != nil {
		return err
	}

	// 逐个解析结果，并写回到 destSlice 中，destSlice 实际上拿到的也是原始对象，相当于写回了入参 values
	for rows.Next() {
		dest := reflect.New(destType).Elem()
		var values []interface{}
		for _, name := range table.FieldNames {
			// dest.FieldByName() 获取到结构体中各个字段的信息 Addr()指向具体地址
			values = append(values, dest.FieldByName(name).Addr().Interface())
		}
		// rows.Scan(values...) 将各个字段匹配对应的值
		if err := rows.Scan(values...); err != nil {
			return err
		}
		destSlice.Set(reflect.Append(destSlice, dest))
	}
	return rows.Close()
}

func (s *Session) First(value interface{}) error {
	dest := reflect.Indirect(reflect.ValueOf(value))
	destSlice := reflect.New(reflect.SliceOf(dest.Type())).Elem()

	if err := s.Limit(1).Find(destSlice.Addr().Interface()); err != nil {
		return err
	}
	if destSlice.Len() == 0 {
		return errors.New("record not found")
	}
	dest.Set(destSlice.Index(0))
	return nil
}
