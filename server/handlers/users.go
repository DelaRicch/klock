package handlers

import (
	"fmt"
	"net/http"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/helpers"
	"github.com/DelaRicch/klock/server/models"
	"github.com/gin-gonic/gin"
)

const errorRfTokenMsg string = "Error generating refresh token"
const invalidEmailOrPass string = "Invalid email or password"

func RegisterUser(ctx *gin.Context)  {
	user := new(models.User)
	if err := ctx.ShouldBindJSON(user); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error(), "success": false})
		return 
	}

	
	// Check if the user with the given email already exists
	var existingUser models.User
	result := database.DB.Where("email = ?", user.Email).First(&existingUser)
	if result.RowsAffected > 0 {
		ctx.JSON(http.StatusConflict, gin.H{"message": "User already exist", "success": false})
		return 
	}


	// Set the default role to "USER" if not specified
	if user.Role == "" {
		user.Role = "USER"
	}

	hashedPassword, err := helpers.HashPassword(user.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error hashing the password", "success": false})
		return 
	}

	user.Password = hashedPassword

	// Generate User ID
	user.UserID = helpers.GenerateID("KLOCK-USER")

	// Create the User
	result = database.DB.Create(&user)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating the user", "success": false})
		return 
	}

	// Generate JWT
	refreshTkn, token, exp, rfExp, err := helpers.CreateJwtToken(user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": errorRfTokenMsg, "success": false})
		return 
	}

	ctx.SetCookie("access_token", token, int(exp), "/", "localhost", false, true)

	accessToken := models.Token{
		Value:      token,
		Expiration: exp,
	}

	refreshToken := models.Token{
		Value:      refreshTkn,
		Expiration: rfExp,
	}

	 ctx.JSON(http.StatusCreated, gin.H{
		"message":      fmt.Sprintf("Successfully registered %v", user.Name),
		"success":      true,
		"accessToken":  accessToken,
		"refreshToken": refreshToken})
}

func DeleteAllUsers(ctx *gin.Context) {
	if err := database.DB.Exec("DELETE FROM users").Error; err != nil {
		fmt.Println("Error deleting users")
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successfully deleted all users", "success": true})
}