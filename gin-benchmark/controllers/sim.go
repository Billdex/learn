package controllers

import (
	"github.com/gin-gonic/gin"
	"strconv"
	"time"
)

func SimWait0Handler(c *gin.Context) {

}

func SimWait10Handler(c *gin.Context) {
	time.Sleep(10 * time.Millisecond)
}

func SimWait50Handler(c *gin.Context) {
	time.Sleep(50 * time.Millisecond)
}

func SimWait100Handler(c *gin.Context) {
	time.Sleep(100 * time.Millisecond)
}

func SimWait500Handler(c *gin.Context) {
	time.Sleep(500 * time.Millisecond)
}

func SimWait1000Handler(c *gin.Context) {
	time.Sleep(1000 * time.Millisecond)
}

// 解析参数会消耗一点点时间
func SimWaitHandler(c *gin.Context) {
	waitTime := c.Param("wait")
	t, _ := strconv.Atoi(waitTime)
	time.Sleep(time.Duration(t) * time.Millisecond)
}
