package config

import (
	"fmt"
	"github.com/go-ini/ini"
	"time"
)

type App struct {
	JwtSecret  string        `ini:"jwt_secret"`
	JwtTimeout time.Duration `ini:"jwt_timeout"`
	JwtRefresh time.Duration `ini:"jwt_refresh"`
}

var AppConfig = &App{}

type Server struct {
	RunMode      string        `ini:"RunMode"`
	HttpPort     int           `ini:"http_port"`
	ReadTimeout  time.Duration `ini:"read_timeout"`
	WriteTimeout time.Duration `ini:"write_timeout"`
}

var ServerConfig = &Server{}

type Database struct {
	Host     string `ini:"host"`
	User     string `ini:"user"`
	Password string `ini:"password"`
	Database string `ini:"database"`
}

var DatabaseConfig = &Database{}

type Log struct {
	Style string `ini:"style"`
	Level string `ini:"level"`
	File  string `ini:"file"`
}

var LogConfig = &Log{}

func Setup() error {
	cfg, err := ini.Load("config/app.ini")
	if err != nil {
		return fmt.Errorf("fail to parse 'conf/app.ini': %v", err)
	}

	err = cfg.Section("app").MapTo(AppConfig)
	if err != nil {
		return fmt.Errorf("cfg.MapTo AppConfig error: %v", err)
	}
	AppConfig.JwtTimeout = AppConfig.JwtTimeout * time.Second
	AppConfig.JwtRefresh = AppConfig.JwtRefresh * time.Hour * 24

	err = cfg.Section("server").MapTo(ServerConfig)
	if err != nil {
		return fmt.Errorf("cfg.MapTo ServerConfig error: %v", err)
	}
	ServerConfig.ReadTimeout = ServerConfig.ReadTimeout * time.Second
	ServerConfig.WriteTimeout = ServerConfig.WriteTimeout * time.Second

	err = cfg.Section("database").MapTo(DatabaseConfig)
	if err != nil {
		return fmt.Errorf("cfg.MapTo DatabaseConfig error: %v", err)
	}

	err = cfg.Section("log").MapTo(LogConfig)
	if err != nil {
		return fmt.Errorf("cfg.MapTo LogConfig error: %v", err)
	}

	return nil
}
