package main

import (
	"fmt"

	"gorm.io/gorm"
)

type GranPatrimonio struct {
	ID            uint        `gorm:"primarykey" json:"id,omitempty"`
	ConjuntoRifID uint        `gorm:"notNull;unique" json:"conjuntoRifId"`
	DiaOctubre    uint        `gorm:"notNull" json:"diaOctubre"`
	DiaNoviembre  uint        `gorm:"notNull" json:"diaNoviembre"`
	ConjuntoRif   ConjuntoRif `gorm:"references:ID" json:"conjuntoRif,omitempty"`
}

func (gp *GranPatrimonio) Assign(cri uint, bdto []GranPatrimonio) map[string]interface{} {
	m := make(map[string]interface{})
	GetDBInstance().Transaction(func(db *gorm.DB) error {
		gpt := bdto
		dr := db.Where(&GranPatrimonio{ConjuntoRifID: cri}).Delete(&GranPatrimonio{})
		if dr.Error != nil {
			m["error"] = dr.Error
			return dr.Error
		}
		cr := db.Create(&gpt)
		if cr.Error != nil {
			m["error"] = cr.Error
			return cr.Error
		} else {
			m["rows"] = cr.RowsAffected
			return nil
		}
	})
	return m
}

func (gp *GranPatrimonio) GetAll() []GranPatrimonio {
	db := GetDBInstance()
	var gpts []GranPatrimonio
	r := db.Preload("ConjuntoRif").Find(&gpts)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return gpts
}

func (gp *GranPatrimonio) DeleteAll() map[string]interface{} {
	db := GetDBInstance()
	r := db.Where("1 = 1").Delete(&GranPatrimonio{})
	m := make(map[string]interface{})
	if r.Error != nil {
		m["error"] = r.Error
		m["ok"] = false
		return m
	}
	m["rows"] = r.RowsAffected
	m["ok"] = true
	return m
}
