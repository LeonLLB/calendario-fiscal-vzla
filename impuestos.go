package main

import (
	"fmt"

	"gorm.io/gorm"
)

type Impuesto struct {
	ID          uint `gorm:"primarykey" json:"id,omitempty"`
	Quincena    uint `gorm:"notNull" json:"quincena"`
	TerminalRif uint `gorm:"notNull;uniqueIndex:unique_fecha" json:"terminalRif"`
	Mes         uint `gorm:"notNull;uniqueIndex:unique_fecha" json:"mes"`
	Dia         uint `gorm:"notNull" json:"dia"`
}

func (i *Impuesto) Assign(quincena uint, trif uint, bdto []Impuesto) map[string]interface{} {
	m := make(map[string]interface{})
	GetDBInstance().Transaction(func(db *gorm.DB) error {
		impuestos := bdto
		dr := db.Where(&Impuesto{Quincena: quincena, TerminalRif: trif}).Delete(&Impuesto{})
		if dr.Error != nil {
			m["error"] = dr.Error
			return dr.Error
		}
		cr := db.Create(&impuestos)
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

func (i *Impuesto) GetAll(quincena uint) []Impuesto {
	db := GetDBInstance()
	var impuestos []Impuesto
	r := db.Find(&impuestos, &Impuesto{Quincena: quincena})
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return impuestos
}

func (i *Impuesto) DeleteAllFromQuincena(quincena uint) map[string]interface{} {
	db := GetDBInstance()
	r := db.Where(&Impuesto{Quincena: quincena}).Delete(&Impuesto{})
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
