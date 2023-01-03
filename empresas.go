package main

import (
	"fmt"

	"gorm.io/gorm"
)

type Empresa struct {
	ID     uint   `gorm:"primarykey" json:"id,omitempty"`
	Nombre string `gorm:"notNull;uniqueIndex:empresa_unique" json:"nombre"`
	Rif    string `gorm:"notNull;uniqueIndex:empresa_unique" json:"rif"`
}

func (e *Empresa) Create(dto Empresa) map[string]interface{} {
	m := make(map[string]interface{})
	GetDBInstance().Transaction(func(db *gorm.DB) error {
		empresa := dto
		r := db.Create(&empresa)
		if r.Error != nil {
			m["error"] = r.Error
			return r.Error
		} else {
			m["id"] = empresa.ID
			m["rows"] = r.RowsAffected
			return nil
		}
	})
	return m
}

func (e *Empresa) GetAll() []Empresa {
	db := GetDBInstance()
	var empresas []Empresa
	r := db.Find(&empresas)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return empresas
}

func (e *Empresa) GetAllByTerminalRif(trif string) []Empresa {
	db := GetDBInstance()
	var empresas []Empresa
	r := db.Where("rif LIKE ?", fmt.Sprintf("%%%s", trif)).Find(&empresas)
	if r.Error != nil {
		fmt.Print(r.Error)
	}
	return empresas
}

func (e *Empresa) Update(id uint, dtoe Empresa) map[string]interface{} {
	db := GetDBInstance()
	m := make(map[string]interface{})

	r := db.
		Model(&Empresa{}).
		Where(Empresa{ID: id}).
		Updates(dtoe)

	if r.Error != nil {
		m["error"] = r.Error
	} else {
		m["id"] = id
		m["rows"] = r.RowsAffected
	}
	return m
}

func (e *Empresa) Delete(id int) map[string]interface{} {
	db := GetDBInstance()
	r := db.Delete(&Empresa{}, id)
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
