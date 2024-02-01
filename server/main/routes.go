package main

import (
	"github.com/DelaRicch/klock/server/handlers"
	"github.com/gin-gonic/gin"
)

func setUpRoutes(app *gin.Engine) {
	app.POST("/login", handlers.LoginUser)
	app.POST("/register", handlers.RegisterUser)
	app.GET("/user-profile", handlers.GetUserProfile)
	app.DELETE("/delete-users", handlers.DeleteAllUsers)
}