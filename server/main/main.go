package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/graphql/generated"
	"github.com/DelaRicch/klock/server/graphql/models"
	 "github.com/DelaRicch/klock/server/graphql/resolvers"

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


func graphqlHandler() gin.HandlerFunc {
	// NewExecutableSchema and Config are in the generated.go file
	// Resolver is in the resolver.go file
	h := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: &resolver.Resolver{}}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func main() {

	loadEnv()
	loadDatabase()
	app := gin.Default()

	app.POST("/query", graphqlHandler())
	app.GET("/", playgroundHandler())

	// set cors
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*", "http://localhost:4200/"},
		// AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		// ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	app.Use(resolver.GinContextToContextMiddleware())

	go func() {
		c := make(chan os.Signal, 1)
		signal.Notify(c, os.Interrupt, syscall.SIGTERM)
		<-c

		// Call the CloseDb function before exiting
		database.Close()

		// Stop the application gracefully
		os.Exit(0)
	}()

	if err := app.Run(":8080"); err != nil {
		panic(err)
	}
}
