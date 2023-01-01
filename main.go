package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	//Call the DB initializer
	InitDB()
	// Create an instance of the app structure
	app := NewApp()
	// Create the instances that are getting binded
	empresa := Empresa{}

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "calendario-fiscal-vzlaf",
		Width:            1024,
		Height:           768,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			&empresa,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
