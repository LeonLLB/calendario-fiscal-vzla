package main

import (
	"fmt"

	"gorm.io/gorm"
)

type Liquidacion struct {
	ID            uint        `gorm:"primarykey" json:"id,omitempty"`
	ConjuntoRifID uint        `gorm:"notNull;unique" json:"conjuntoRifId"`
	Fecha         string      `gorm:"notNull" json:"fecha"`
	ConjuntoRif   ConjuntoRif `gorm:"references:ID" json:"conjuntoRif,omitempty"`
}

func (l *Liquidacion) Assign(cri uint, bdto []Liquidacion) map[string]interface{} {
	m := make(map[string]interface{})
	GetDBInstance().Transaction(func(db *gorm.DB) error {
		liq := bdto
		dr := db.Where(&Liquidacion{ConjuntoRifID: cri}).Delete(&Liquidacion{})
		if dr.Error != nil {
			m["error"] = dr.Error
			return dr.Error
		}
		cr := db.Create(&liq)
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

func (l *Liquidacion) GetAll() []Liquidacion {
	db := GetDBInstance()
	var liqds []Liquidacion
	r := db.Preload("ConjuntoRif").Find(&liqds)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return liqds
}

func (l *Liquidacion) DeleteAll() map[string]interface{} {
	db := GetDBInstance()
	r := db.Where("1 = 1").Delete(&Liquidacion{})
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
