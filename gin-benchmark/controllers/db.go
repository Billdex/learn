package controllers

import (
	"fmt"
	"gin-benchmark/models"
	"github.com/gin-gonic/gin"
	"math/rand"
	"strconv"
)

var maxRandom int64 = 1000000

// 查询的字段记得在数据库加索引，不然贼慢

func ReadIntDBHandler(c *gin.Context) {
	t := c.Param("count")
	count, _ := strconv.Atoi(t)
	for i := 0; i < count; i++ {
		users := models.User{}
		random := rand.Int63n(maxRandom)
		_, _ = models.DB.Where("random = ?", random).Get(&users)
	}
}

func ReadStrDBHandler(c *gin.Context) {
	t := c.Param("count")
	count, _ := strconv.Atoi(t)
	for i := 0; i < count; i++ {
		users := make([]models.User, 0)
		name := RandStringBytes(3)
		_ = models.DB.Where("name like ?", fmt.Sprintf("name %s%%", name)).Find(&users)
	}
}

func WriteDBHandler(c *gin.Context) {
	t := c.Param("count")
	count, _ := strconv.Atoi(t)
	for i := 0; i < count; i++ {
		user := models.User{
			Name:      fmt.Sprintf("name %s", RandStringBytes(5)),
			Phone:     "18212345678",
			Password:  fmt.Sprintf("password %s", RandStringBytes(5)),
			Random:    rand.Int63n(maxRandom),
			Gender:    0,
			Intro:     fmt.Sprintf("intro %s", RandStringBytes(10)),
			Avatar:    fmt.Sprintf("avatar %s", RandStringBytes(10)),
			AvatarSrc: fmt.Sprintf("avatar %s", RandStringBytes(10)),
		}
		models.DB.Insert(&user)

	}

}

const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func RandStringBytes(n int) string {
	b := make([]byte, n)
	for i := range b {
		b[i] = letterBytes[rand.Intn(len(letterBytes))]
	}
	return string(b)
}
