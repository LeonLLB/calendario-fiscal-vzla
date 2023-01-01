package main

import (
	"fmt"

	"gorm.io/gorm"
)

type RetencionISLR struct {
	ID            uint        `gorm:"primarykey" json:"id,omitempty"`
	ConjuntoRifID uint        `gorm:"notNull;uniqueIndex:ret_islr_unique" json:"conjuntoRifId"`
	Mes           uint        `gorm:"notNull;uniqueIndex:ret_islr_unique" json:"mes"`
	Dia           uint        `gorm:"notNull" json:"dia"`
	ConjuntoRif   ConjuntoRif `gorm:"references:ID" json:"conjuntoRif,omitempty"`
}

func (ri *RetencionISLR) Assign(cri uint, bdto []RetencionISLR) map[string]interface{} {
	m := make(map[string]interface{})
	GetDBInstance().Transaction(func(db *gorm.DB) error {
		retIslr := bdto
		dr := db.Where(&RetencionISLR{ConjuntoRifID: cri}).Delete(&RetencionISLR{})
		if dr.Error != nil {
			m["error"] = dr.Error
			return dr.Error
		}
		cr := db.Create(&retIslr)
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

func (ri *RetencionISLR) GetAll() []RetencionISLR {
	db := GetDBInstance()
	var retIslrs []RetencionISLR
	r := db.Preload("ConjuntoRif").Find(&retIslrs)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return retIslrs
}

func (ri *RetencionISLR) DeleteAll() map[string]interface{} {
	db := GetDBInstance()
	r := db.Where("1 = 1").Delete(&RetencionISLR{})
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
