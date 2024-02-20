package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	loadEnv()
	loadDatabase()
	app := gin.Default()

	app.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Klock E-commerce!",
		})
	})

	// set cors
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*", "http://localhost:4200/"},
		// AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		// ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// set routes
	setUpRoutes(app)

	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, syscall.SIGTERM)
		<-c

		// Call the CloseDb function before exiting
		database.CloseDb()

		// Stop the application gracefully
		os.Exit(0)
	}()

	if err := app.Run(":8000"); err != nil {
		panic(err)
	}
}

func loadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

func loadDatabase() {
	database.ConnectDb()
	database.DB.AutoMigrate(&models.User{})
}
