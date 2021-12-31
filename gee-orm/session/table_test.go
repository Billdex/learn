package session

import "testing"

type User struct {
	Age  int
	Name string `geeorm:"PRIMARY KEY"`
}

type TUser struct {
	Id   int64 `geeorm:"PRIMARY KEY"`
	Name string
}

func TestSession_CreateTable(t *testing.T) {
	s := New(TestDB, TestDial).Model(&TUser{})
	_ = s.DropTable()
	_ = s.CreateTable()
	if !s.HasTable() {
		t.Fatal("Failed to create table User")
	}
}
