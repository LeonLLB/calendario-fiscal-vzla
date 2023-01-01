package main

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDBInstance() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("calendario-fiscal.db"), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	return db
}

func InitDB() {
	GetDBInstance().AutoMigrate(
		&Empresa{},
		&Impuesto{},
		&ConjuntoRif{},
		&RetencionISLR{},
		&Liquidacion{},
		&GranPatrimonio{},
	)
}
