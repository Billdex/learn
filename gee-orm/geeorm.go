package geeorm

import (
	"database/sql"
	"geeorm/dialect"
	"log"

	"geeorm/session"
)

type Engine struct {
	db      *sql.DB
	dialect dialect.Dialect
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
	dial, ok := dialect.GetDialect(driver)
	if !ok {
		log.Printf("dialect %s Not Found", driver)
		return
	}
	e = &Engine{db: db, dialect: dial}
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
	return session.New(engine.db, engine.dialect)
}
