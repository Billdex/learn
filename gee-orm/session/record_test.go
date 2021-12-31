package session

import "testing"

var (
	user1 = &User{Name: "Tom", Age: 18}
	user2 = &User{Name: "Sam", Age: 25}
	user3 = &User{Name: "Jack", Age: 25}
)

func testRecordInit(t *testing.T) *Session {
	t.Helper()
	s := New(TestDB, TestDial).Model(&User{})
	err1 := s.DropTable()
	err2 := s.CreateTable()
	_, err3 := s.Insert(user1, user2)
	if err1 != nil || err2 != nil || err3 != nil {
		t.Fatal("failed init test records")
	}
	return s
}

func TestSession_Insert(t *testing.T) {
	s := testRecordInit(t)
	affected, err := s.Insert(user3)
	if err != nil || affected != 1 {
		t.Fatal("failed to create record")
	}
}

func TestSession_Find(t *testing.T) {
	s := testRecordInit(t)
	var users []User
	if err := s.Find(&users); err != nil || len(users) != 2 {
		t.Fatal("failed to query all", err)
	}
	t.Log(users)
}

func TestSession_WhereFind(t *testing.T) {
	s := testRecordInit(t)
	var users []User
	if err := s.Where("Age = ?", 18).Find(&users); err != nil || len(users) != 1 {
		t.Fatal("failed to query age 18 user", err)
	}
	t.Log(users)
}

func TestSession_WhereGet(t *testing.T) {
	s := testRecordInit(t)
	var user User
	if err := s.Where("name = ?", "Sam").Get(&user); err != nil || user.Age != 25 {
		t.Fatal("failed to get sam user info", err)
	}
	t.Log(user)
}

func TestSession_First(t *testing.T) {
	s := testRecordInit(t)
	var user User
	if err := s.First(&user); err != nil {
		t.Fatal("failed to get first user", err)
	}
	t.Log(user)
}
