package main

import (
	"fmt"

	"gorm.io/gorm"
)

type ConjuntoRif struct {
	ID   uint `gorm:"primarykey" json:"id,omitempty"`
	RIF1 uint `gorm:"notNull;uniqueIndex:conjunto_unique" json:"rif1"`
	RIF2 uint `gorm:"notNull;uniqueIndex:conjunto_unique" json:"rif2"`
}

func (cr *ConjuntoRif) Create(dto ConjuntoRif) map[string]interface{} {
	m := make(map[string]interface{})
	GetDBInstance().Transaction(func(db *gorm.DB) error {
		conjunto := dto
		r := db.Create(&conjunto)
		if r.Error != nil {
			m["error"] = r.Error
			return r.Error
		} else {
			m["id"] = conjunto.ID
			m["rows"] = r.RowsAffected
			return nil
		}
	})
	return m
}

func (cr *ConjuntoRif) GetOne(id uint) ConjuntoRif {
	db := GetDBInstance()
	crif := ConjuntoRif{ID: id}
	r := db.First(&crif)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return crif
}

func (cr *ConjuntoRif) GetAll() []ConjuntoRif {
	db := GetDBInstance()
	crif := []ConjuntoRif{}
	r := db.Find(&crif)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return crif
}

func (cr *ConjuntoRif) Update(id uint, dtocr ConjuntoRif) map[string]interface{} {
	db := GetDBInstance()
	m := make(map[string]interface{})

	r := db.
		Model(&ConjuntoRif{}).
		Where(ConjuntoRif{ID: id}).
		Updates(dtocr)

	if r.Error != nil {
		m["error"] = r.Error
	} else {
		m["id"] = id
		m["rows"] = r.RowsAffected
	}
	return m
}
