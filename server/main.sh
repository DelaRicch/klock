#!/bin/bash

# Install GQLGEN
echo "Download GQLGEN imports.."
echo "Installing GQLGEN imports.."
go get github.com/99designs/gqlgen/internal/imports@v0.17.45

# Run GQL function
echo "Running GQL function.."
go generate ./...

#Run main function
echo "Running main.go"
go run main.go

echo "Script completed successfully. 😄😁"