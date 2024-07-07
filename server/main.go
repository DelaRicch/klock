package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/DelaRicch/klock/server/database"
	ginhandler "github.com/DelaRicch/klock/server/gin-handler"
	"github.com/DelaRicch/klock/server/graphql/models"
	resolver "github.com/DelaRicch/klock/server/graphql/resolvers"
	"github.com/DelaRicch/klock/server/rest"
	"github.com/DelaRicch/klock/server/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func loadEnv() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

func loadDatabase() {
	database.Connect()
	database.DB.AutoMigrate(&models.User{})
}

func main() {

	loadEnv()
	loadDatabase()

	port := os.Getenv("APP_PORT")
	if port == "" {
		port = "8080"
	}

	app := gin.Default()

	frontendUrl := os.Getenv("FRONTEND_URL")

	app.Use(resolver.GinContextToContextMiddleware())


	// set cors
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*", frontendUrl},
		// AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		// ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// GraphQl
	app.POST("/graphql", ginhandler.GrapghqlHandler())
	app.GET("/", ginhandler.PlaygroundHandler())

	// RestApi 
	rest.RestRoutes(app)

	// Google auth
	app.GET("auth/google", services.GoogleLogin)
	app.GET("auth/google/callback", services.GoogleCallback)

	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, syscall.SIGTERM)
		<-c

		// Call the CloseDb function before exiting
		database.Close()

		// Stop the application gracefully
		os.Exit(0)
	}()

	if err := app.Run(fmt.Sprintf(":%s", port)); err != nil {
		panic(err)
	}
}
