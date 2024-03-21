package resolver

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
)

//go:generate go run generate.go

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

const notAuthorizedToPerformAction string = "Not authorized to perform this action"

type Resolver struct {
}

type contextKey string

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), contextKey("Klock-gin-context"), c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func GinContextFromContext(c context.Context) (*gin.Context, error) {
	ginContext := c.Value(contextKey("Klock-gin-context"))
	if ginContext == nil {
		err := fmt.Errorf("could not retrieve gin.Context")
		return nil, err
	}
	gc, ok := ginContext.(*gin.Context)
	if !ok {
		err := fmt.Errorf("gin.Context has the wrong type")
		return nil, err
	}
	return gc, nil
}
