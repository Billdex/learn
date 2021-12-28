package geeorm

import (
	"database/sql"
	"log"

	"geeorm/session"
)

type Engine struct {
	db *sql.DB
}

const (
	DriverMysql   = "mysql"
	DriverSqlite3 = "sqlite3"
)

// NewEngine 初始化 Engine
func NewEngine(driver, source string) (e *Engine, err error) {
	db, err := sql.Open(driver, source)
	if err != nil {
		log.Println(err)
		return
	}
	// Send a ping to make sure the database connection is alive.
	if err = db.Ping(); err != nil {
		log.Println(err)
		return
	}
	e = &Engine{db: db}
	log.Println("Connect database success")
	return
}

func (engine *Engine) Close() {
	if err := engine.db.Close(); err != nil {
		log.Println("Failed to close database")
	}
	log.Println("Close database success")
}

func (engine *Engine) NewSession() *session.Session {
	return session.New(engine.db)
}
