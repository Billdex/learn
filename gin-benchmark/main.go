package main

import (
	"fmt"
	"gin-benchmark/config"
	"gin-benchmark/models"
	"gin-benchmark/routers"
	"log"
)

func main() {
	// 加载配置文件
	err := config.Setup()
	if err != nil {
		log.Fatalln("配置文件加载失败", err)
	}

	// 初始化数据库连接
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&loc=Local",
		config.DatabaseConfig.User,
		config.DatabaseConfig.Password,
		config.DatabaseConfig.Host,
		config.DatabaseConfig.Database,
	)
	err = models.Setup(dsn)
	if err != nil {
		log.Fatalln("数据库初始化失败", err)
	}

	r := routers.Setup()
	r.Run(fmt.Sprintf(":%d", config.ServerConfig.HttpPort))
}
