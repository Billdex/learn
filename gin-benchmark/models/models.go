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

	DB.ShowSQL(false)
	DB.SetMaxIdleConns(20)
	DB.SetMaxOpenConns(40)
	return nil

}
