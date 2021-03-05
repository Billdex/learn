package main

import (
	"context"
	"fmt"
	"go-gin-example/models"
	"go-gin-example/pkg/logging"
	"go-gin-example/routers"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"go-gin-example/pkg/setting"
)

func main() {

	setting.Setup()
	models.SetUp()
	logging.SetUp()

	router := routers.InitRouter()
	router.Run()
	s := &http.Server{
		Addr:           fmt.Sprintf(":%d", setting.ServerSetting.HttpPort),
		Handler:        router,
		ReadTimeout:    setting.ServerSetting.ReadTimeout,
		WriteTimeout:   setting.ServerSetting.WriteTimeout,
		MaxHeaderBytes: 1 << 20,
	}
	go func() {
		if err := s.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Listen: %s\n", err)
		}
	}()

	quit := make(chan os.Signal)
	// 使用supervisor启动时，需要配置参数stopsignal=INT，使得chan能够正确捕获信号正确退出
	signal.Notify(quit, os.Interrupt)
	<-quit

	log.Println("Shutdown Server ...")

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(setting.ServerSetting.ReadTimeout)*time.Second)
	defer cancel()
	if err := s.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}

	log.Println("Server exiting")
}
