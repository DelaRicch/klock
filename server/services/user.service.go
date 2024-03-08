package services

import (
	"fmt"
	"time"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/graphql/models"
	"github.com/DelaRicch/klock/server/helpers"
	"github.com/gin-gonic/gin"
)

const errorRfTokenMsg string = "Error generating refresh token"
const invalidEmailOrPass string = "Invalid email or password"
const userNotFound string = "User not found"
const notAuthorizedToPerformAction string = "Not authorized to perform this action"

func RegisterUser(input models.CreateNewUser) (*models.UserAuthResponse, error) {
	provider := "Klock"

	// Check if name input field is valid
	if !helpers.IsValidInput(input.Name) {
		return &models.UserAuthResponse{}, fmt.Errorf("Invalid name")
	}

	// Check if the input.Email is typeof email
	if !helpers.IsValidEmail(input.Email) {
		return &models.UserAuthResponse{}, fmt.Errorf("Invalid email")
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
		return &models.UserAuthResponse{}, fmt.Errorf("User already exist")
	}

	// Hash password
	hashedPassword, err := helpers.HashPassword(user.Password)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf("Error hashing password")
	}
	user.Password = hashedPassword

	// Generate User ID and other fields
	user.UserID = helpers.GenerateID()
	user.Provider = &provider

	result = database.DB.Create(user)
	if result.Error != nil {
		return &models.UserAuthResponse{}, result.Error
	}

	// Generate JWT
	refreshTkn, token, exp, rfExp, err := helpers.CreateJwtToken(user)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf(errorRfTokenMsg)
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

func LoginUser(input models.LoginUser) (*models.UserAuthResponse, error) {
	// Check if email input field is valid
	if !helpers.IsValidEmail(input.Email) {
		return &models.UserAuthResponse{}, fmt.Errorf("Invalid email")
	}

	user := models.User{}
	result := database.DB.Where("email = ?", input.Email).First(&user)
	if result.RowsAffected == 0 {
		return &models.UserAuthResponse{}, fmt.Errorf(invalidEmailOrPass)
	}

	// Check if password is correct
	if !helpers.VerifyPassword(user.Password, input.Password) {
		return &models.UserAuthResponse{}, fmt.Errorf(invalidEmailOrPass)
	}

	refreshTkn, token, _, rfExp, err := helpers.CreateJwtToken(&user)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf(errorRfTokenMsg)
	}

	// extend access token duration if remember me is true
	var tokenExpiry int64
	if *input.RememberMe {
		tokenExpiry = time.Now().Add(time.Hour * 24).Unix()
	} else {
		tokenExpiry = time.Now().Add(time.Minute * 1).Unix()
	}

	accessToken := models.Token{
		Value:      token,
		Expiration: tokenExpiry,
	}

	refreshToken := models.Token{
		Value:      refreshTkn,
		Expiration: rfExp,
	}

	return &models.UserAuthResponse{
		Message: fmt.Sprintf("%s logged in successfully", user.Name),
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

func GetUserProfile(ctx *gin.Context) (*models.UserProfile, error) {
	user, err := helpers.ValidateAccessToken(ctx)
	if err != nil {
		return &models.UserProfile{}, err
	}

	result := database.DB.Where("user_id = ?", user.UserID).First(&user)
	if result.RowsAffected == 0 {
		return &models.UserProfile{}, fmt.Errorf(userNotFound)
	}

	return &models.UserProfile{
		UserID:   &user.UserID,
		Name:     &user.Name,
		Email:    &user.Email,
		Role:     &user.Role,
		Photo:    user.Photo,
		Phone:    user.Phone,
		Location: user.Location,
		Gender:   user.Gender,
	}, nil

}

func UpdateUser(ctx *gin.Context, input models.UpdateUser) (*models.UserAuthResponse, error) {
	
	res, err := helpers.ValidateAccessToken(ctx)
	if err != nil {
		return &models.UserAuthResponse{}, err
	}


	user := models.User{}
	userID := res.UserID


	result := database.DB.Model(&user).Where("user_id = ?", userID).Updates(&input)

	if result.Error != nil {
		return &models.UserAuthResponse{}, fmt.Errorf("Error updating user")
	}

	var userProfile models.User
	userResult := database.DB.Where("user_id = ?", userID).First(&userProfile)
	if userResult.RowsAffected == 0 {
		return &models.UserAuthResponse{}, fmt.Errorf(userNotFound)
	}

	return &models.UserAuthResponse{
		Message: fmt.Sprintf("%s updated in successfully", userProfile.Name),
		User: &models.UserProfile{
			UserID:   &userProfile.UserID,
			Name:     &userProfile.Name,
			Email:    &userProfile.Email,
			Role:     &userProfile.Role,
			Photo:    userProfile.Photo,
			Phone:    userProfile.Phone,
			Location: userProfile.Location,
			Gender:   userProfile.Gender,
		},
	}, nil

}

func GetAllUsers() ([]*models.UserProfile, error) {
	users := []models.User{}
	database.DB.Find(&users)

	var usersResponse []*models.UserProfile
	for _, user := range users {
		userResponse := &models.UserProfile{
			UserID:   &user.UserID,
			Name:     &user.Name,
			Email:    &user.Email,
			Role:     &user.Role,
			Photo:    user.Photo,
			Phone:    user.Phone,
			Location: user.Location,
			Gender:   user.Gender,
		}
		usersResponse = append(usersResponse, userResponse)
	}
	return usersResponse, nil

}

func DeleteUser(ctx *gin.Context) (*models.Message, error) {

res, err := helpers.ValidateAccessToken(ctx)
	if err != nil {
		return &models.Message{}, err
	}

	if err := database.DB.Exec("DELETE FROM users WHERE user_id = ?", res.UserID).Error; err != nil {
		return &models.Message{}, fmt.Errorf("Error deleting user")
	}

	return &models.Message{Message: fmt.Sprintf("Successfully deleted %s", res.Name)}, nil
}

func DeleteAllUsers(userID string) (*models.Message, error) {
	user := models.User{}

	result := database.DB.Where("user_id = ?", userID).First(&user)
	if result.RowsAffected == 0 {
		return &models.Message{}, fmt.Errorf(notAuthorizedToPerformAction)
	}

	res := database.DB.Where("role = 'ADMIN'").First(&user)
	if res.RowsAffected == 0 {
		return &models.Message{}, fmt.Errorf(notAuthorizedToPerformAction)
	}

	if err := database.DB.Exec("DELETE FROM users WHERE role = 'USER'").Error; err != nil {
		return &models.Message{}, fmt.Errorf("Error deleting users")
	}
	return &models.Message{Message: "Successfully deleted all users"}, nil

}
