package routers

import (
	"gin-benchmark/controllers"
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	r := gin.Default()

	// 通过sleep模拟业务所需时间测试可承载并发数
	simGroup := r.Group("/sim")
	{
		simGroup.GET("/time/0", controllers.SimWait0Handler)
		simGroup.GET("/time/10", controllers.SimWait10Handler)
		simGroup.GET("/time/50", controllers.SimWait50Handler)
		simGroup.GET("/time/100", controllers.SimWait100Handler)
		simGroup.GET("/time/500", controllers.SimWait500Handler)
		simGroup.GET("/time/1000", controllers.SimWait1000Handler)
		simGroup.GET("/set/:wait", controllers.SimWaitHandler)
	}

	// 仅测试请求返回body参数序列化过程与数据传输消耗，测试消耗时间与并发数
	jsonGroup := r.Group("/json")
	{
		jsonGroup.GET("/hello", controllers.JsonHelloHandler)
		jsonGroup.GET("/big", controllers.JsonBigHandler)
	}

	// 加入数据库读写测试该情况下的消耗时间与并发数(数据库的io性能会成为该部分瓶颈)
	dbGroup := r.Group("/db")
	{
		dbGroup.GET("/read/:count", controllers.ReadDBHandler)
		dbGroup.GET("/write/:count", controllers.WriteDBHandler)
	}

	return r
}
