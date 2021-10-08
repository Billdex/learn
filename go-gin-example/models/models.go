package models

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"log"
	"os"
	"time"

	_ "gorm.io/driver/mysql"

	"go-gin-example/pkg/setting"
)

var db *gorm.DB

type Model struct {
	ID         int `gorm:"primary_key" json:"id"`
	CreatedOn  int `json:"created_on"`
	ModifiedOn int `json:"modified_on"`
}

func SetUp() {
	var (
		err                                               error
		dbType, dbName, user, password, host, tablePrefix string
	)

	sec := setting.DatabaseSetting

	dbType = sec.Type
	dbName = sec.Name
	user = sec.User
	password = sec.Password
	host = sec.Host
	tablePrefix = sec.TablePrefix

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local",
		user,
		password,
		host,
		dbName)
	var dialector gorm.Dialector
	switch dbType {
	case "mysql":
		dialector = mysql.Open(dsn)
	case "sqlite":
		dialector = sqlite.Open(dsn)
	default:
		dialector = mysql.Open(dsn)
	}
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold: time.Second,   // 慢 SQL 阈值
			LogLevel:      logger.Silent, // Log level
			Colorful:      false,         // 禁用彩色打印
		},
	)

	db, err = gorm.Open(dialector, &gorm.Config{
		Logger: newLogger,
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   tablePrefix,
			SingularTable: true,
		},
	})

	if err != nil {
		log.Println(err)
	}

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
}
