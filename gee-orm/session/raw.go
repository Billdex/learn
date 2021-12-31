package session

import (
	"database/sql"
	"geeorm/clause"
	"geeorm/dialect"
	"geeorm/schema"
	"log"
	"strings"
)

type Session struct {
	// 通过 sql.Open 构造的  sql.DB 对象
	db *sql.DB
	// 指定数据库方言类型 mysql、sqlite 等
	dialect dialect.Dialect

	refTable *schema.Schema

	clause clause.Clause
	// Sql 语句 Builder
	sql strings.Builder
	// 记录各占位符的对应值，最后进行填充用
	sqlVars []interface{}
}

// New 根据 *sql.DB 和 dialect.Dialect 初始化一个 Session
func New(db *sql.DB, dialect dialect.Dialect) *Session {
	return &Session{
		db:      db,
		dialect: dialect,
	}
}

// Clear 清除缓存语句与值
func (s *Session) Clear() {
	s.sql.Reset()
	s.sqlVars = nil
	s.clause = clause.Clause{}
}

// DB 获取 Session 对应的数据库对象
func (s *Session) DB() *sql.DB {
	return s.db
}

// Raw 简单构造查询语句，第一个参数为带 ? 占位符的原始 sql 语句, 后面为各占位符处应填的值
func (s *Session) Raw(sql string, values ...interface{}) *Session {
	s.sql.WriteString(sql)
	s.sql.WriteString(" ")
	s.sqlVars = append(s.sqlVars, values...)
	return s
}

// Exec 执行由 Raw 所构造好的语句与参数
func (s *Session) Exec() (result sql.Result, err error) {
	defer s.Clear()
	log.Println(s.sql.String(), s.sqlVars)
	if result, err = s.DB().Exec(s.sql.String(), s.sqlVars...); err != nil {
		log.Println(err)
	}
	return
}

// QueryRow 查询单条语句
func (s *Session) QueryRow() *sql.Row {
	defer s.Clear()
	log.Println(s.sql.String(), s.sqlVars)
	// sql.DB.QueryRow 返回单个结果
	return s.DB().QueryRow(s.sql.String(), s.sqlVars...)
}

// QueryRows 查询出一个列表
func (s *Session) QueryRows() (rows *sql.Rows, err error) {
	defer s.Clear()
	log.Println(s.sql.String(), s.sqlVars)
	// sql.DB.Query 返回结果列表
	if rows, err = s.DB().Query(s.sql.String(), s.sqlVars...); err != nil {
		log.Println(err)
	}
	return
}
