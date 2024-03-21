package ginhandler

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	graphql "github.com/DelaRicch/klock/server/graphql/generated"
	resolver "github.com/DelaRicch/klock/server/graphql/resolvers"
	"github.com/gin-gonic/gin"

)

func PlaygroundHandler() gin.HandlerFunc {
	h := playground.Handler("Klock GraphQL", "/graphql")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func GrapghqlHandler() gin.HandlerFunc {
	h := handler.NewDefaultServer(graphql.NewExecutableSchema(graphql.Config{Resolvers: &resolver.Resolver{}}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

