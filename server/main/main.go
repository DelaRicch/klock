package main

import (
	// "github.com/99designs/gqlgen"
	// "github.com/cosmtrek/air"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// if err := air.Go(); err != nil {
	// 	panic(err)
	// }

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})

	router.Run(":8000")
}
