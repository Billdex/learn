package models

import "time"

type User struct {
	Id         int64     `xorm:"'id' pk autoincr"`
	Name       string    `xorm:"name"`
	Random     int64     `xorm:"random"`
	Phone      string    `xorm:"phone"`
	Password   string    `xorm:"password"`
	Gender     int64     `xorm:"gender"`
	Intro      string    `xorm:"intro"`
	Avatar     string    `xorm:"avatar"`
	AvatarSrc  string    `xorm:"avatar_src"`
	CreateTime time.Time `xorm:"'create_time' created"`
	UpdateTime time.Time `xorm:"'update_time' updated"`
}

func (User) TableName() string {
	return "user"
}
