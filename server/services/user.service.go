package services

import (
	"fmt"
	"time"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/graphql/models"
	"github.com/DelaRicch/klock/server/helpers"
)

const errorRfTokenMsg string = "Error generating refresh token"
const invalidEmailOrPass string = "Invalid email or password"

func RegisterUser(input models.CreateNewUser) (*models.UserAuthResponse, error) {
	provider := "Klock"

	// Check if the input.Email is typeof email
	if !helpers.IsValidEmail(input.Email) {
		return &models.UserAuthResponse{Success: false, Message: "Invalid email"}, nil
	}

	user := &models.User{
		Name:      input.Name,
		Email:     input.Email,
		Password:  input.Password,
		Role:      models.RoleUser,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	if input.Role != nil {
		user.Role = *input.Role
	}

	// Check if user already exist
	var existingUser = models.User{}
	result := database.DB.Where("email = ?", user.Email).First(&existingUser)
	if result.RowsAffected > 0 {
		return &models.UserAuthResponse{Success: false, Message: "User already exist"}, nil
	}

	// Hash password
	hashedPassword, err := helpers.HashPassword(user.Password)
	if err != nil {
		return &models.UserAuthResponse{Success: false, Message: "Error hashing password"}, err
	}
	user.Password = hashedPassword

	// Generate User ID and other fields
	user.UserID = helpers.GenerateID("KLOCK-USER")
	user.Provider = &provider

	fmt.Println(user.UserID)

	result = database.DB.Create(user)
	if result.Error != nil {
		return &models.UserAuthResponse{Success: false, Message: result.Error.Error()}, result.Error
	}

	// Generate JWT
	refreshTkn, token, exp, rfExp, err := helpers.CreateJwtToken(user)
	if err != nil {
		return &models.UserAuthResponse{Success: false, Message: errorRfTokenMsg}, err
	}

	accessToken := models.Token{
		Value:      token,
		Expiration: exp,
	}

	refreshToken := models.Token{
		Value:      refreshTkn,
		Expiration: rfExp,
	}

	return &models.UserAuthResponse{
		Success: true,
		Message: fmt.Sprintf("%s registered successfully", user.Name),
		User: &models.UserProfile{
			UserID:   &user.UserID,
			Name:     &user.Name,
			Email:    &user.Email,
			Role:     &user.Role,
			Photo:    user.Photo,
			Phone:    user.Phone,
			Location: user.Location,
			Gender:   user.Gender,
		},
		Token: &models.TokenResponse{
			AccessToken:  &accessToken,
			RefreshToken: &refreshToken,
		},
	}, nil
}