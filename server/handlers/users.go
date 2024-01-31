package handlers

import (
	"fmt"
	"net/http"
	"time"

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

	ctx.SetCookie("access_token", token, int(time.Hour*1), "/", "localhost", true, true)

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
		"refreshToken": refreshToken,
	})
}

func LoginUser(ctx *gin.Context) {
	loginUser := new(models.User)
	fmt.Println(loginUser.RememberMe, ":::login user request")
	if err := ctx.ShouldBindJSON(loginUser); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error(), "success": false})
		return 
	}

	// extend access token duration if remember me is true
	var tokenExpiry time.Time
	if loginUser.RememberMe {
		tokenExpiry = time.Now().Add(time.Hour * 24)
	} else {
		tokenExpiry = time.Now().Add(time.Minute * 1)
	}

	// Retrieve the user with the given email
	var user models.User
	result := database.DB.Where("email = ?", loginUser.Email).First(&user)
	if result.RowsAffected == 0 {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": invalidEmailOrPass, "success": false})
		return
	}

	// Verify the password using Argon2id
	if !helpers.VerifyPassword(user.Password, loginUser.Password) {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": invalidEmailOrPass, "success": false})
	}

	// Generate JWt
	refreshTkn, token, _, rfExp, err := helpers.CreateJwtToken(&user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": errorRfTokenMsg, "success": false})
		return 
	}

	ctx.SetCookie("access_token", token, int(tokenExpiry.Unix()), "/", "localhost", true, true)

	accessToken := models.Token{
		Value: token,
		Expiration: tokenExpiry.Unix(),
	}

	refreshToken := models.Token{
		Value: refreshTkn,
		Expiration: rfExp,
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message":      fmt.Sprintf("Welcome %v", user.Name),
		"success":      true,
		"access_oken":  accessToken,
		"refresh_token": refreshToken,
	})

}

func GetUserProfile(ctx *gin.Context) {
	user, err := helpers.ValidateAccessToken(ctx)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid access token", "success": false})
		return
	}

	userProfile := models.UserProfile{
		Name: user.Name,
		Email: user.Email,
		UserID: user.UserID,
		Role: user.Role,
		Photo: user.Photo,
		Phone: user.Phone,
		Location: user.Location,
		Gender: user.Gender,
	}

	ctx.JSON(http.StatusOK, gin.H{"user": userProfile, "success": true})
}

func DeleteAllUsers(ctx *gin.Context) {
	if err := database.DB.Exec("DELETE FROM users").Error; err != nil {
		fmt.Println("Error deleting users")
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Successfully deleted all users", "success": true})
}