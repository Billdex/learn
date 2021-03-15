package models

import (
	_ "github.com/go-sql-driver/mysql"
	"xorm.io/xorm"
)

var DB *xorm.Engine

func Setup(dsn string) error {

	var err error
	DB, err = xorm.NewEngine("mysql", dsn)
	if err != nil {
		return err
	}

	DB.ShowSQL(true)
	DB.SetMaxIdleConns(10)
	DB.SetMaxOpenConns(20)
	return nil

}
