package rest

import (
	"github.com/DelaRicch/klock/server/services"
	"github.com/gin-gonic/gin"
)

func RestRoutes(app *gin.Engine) {
	app.POST("/add-product", services.AddProduct)
}