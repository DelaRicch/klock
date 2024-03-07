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

type Resolver struct {
}

type contextKey string

func GinContextToContextMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), contextKey("GinContextKey"), c)
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func GinContextFromContext(ctx context.Context) (*gin.Context, error) {
    ginContext := ctx.Value(contextKey("GinContextKey"))
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