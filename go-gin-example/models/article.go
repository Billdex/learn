package models

import (
	"gorm.io/gorm"
	"time"
)

type Article struct {
	Model

	TagID int `json:"tag_id" gorm:"index"`
	Tag   Tag `json:"tag"`

	Title      string `json:"title"`
	Desc       string `json:"desc"`
	Content    string `json:"content"`
	CreatedBy  string `json:"created_by"`
	ModifiedBy string `json:"modified_by"`
	State      int    `json:"state"`
}

func (article *Article) BeforeCreate(scope *gorm.DB) error {
	scope.Set("CreatedOn", time.Now().Unix())
	return nil
}

func (article *Article) BeforeUpdate(scope *gorm.DB) error {
	scope.Update("ModifiedOn", time.Now().Unix())
	return nil
}

func ExistArticleByID(id int) (bool, error) {
	var article Article
	err := db.Select("id").Where("id = ?", id).First(&article).Error

	if article.ID > 0 {
		return true, nil
	}

	return false, err
}

func GetArticleTotal(maps interface{}) (count int64, err error) {
	err = db.Model(&Article{}).Where(maps).Count(&count).Error

	return count, err
}

func GetArticles(pageNum int, pageSize int, maps interface{}) (articles []*Article, err error) {
	err = db.Preload("Tag").Where(maps).Offset(pageNum).Limit(pageSize).Find(&articles).Error

	return
}

func GetArticle(id int) (article *Article, err error) {
	err = db.Where("id = ?", id).First(&article).Error
	if err != nil {
		return
	}
	tag := new(Tag)
	err = db.Where("id = ?", article.TagID).First(tag).Error
	if err != nil {
		return
	}
	article.Tag = *tag

	return
}

func EditArticle(id int, data interface{}) error {
	return db.Model(&Article{}).Where("id = ?", id).Updates(data).Error
}

func AddArticle(data map[string]interface{}) error {
	return db.Create(&Article{
		TagID:     data["tag_id"].(int),
		Title:     data["title"].(string),
		Desc:      data["desc"].(string),
		Content:   data["content"].(string),
		CreatedBy: data["created_by"].(string),
		State:     data["state"].(int),
	}).Error
}

func DeleteArticle(id int) error {
	return db.Where("id = ?", id).Delete(Article{}).Error
}
