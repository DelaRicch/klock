package services

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	config "github.com/DelaRicch/klock/server/auth-config"
	"github.com/golang-jwt/jwt"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/graphql/models"
	"github.com/DelaRicch/klock/server/helpers"
	"github.com/gin-gonic/gin"
)

const (
	errorRfTokenMsg              = "error generating refresh token"
	invalidEmailOrPass           = "invalid email or password"
	userNotFound                 = "user not found"
	notAuthorizedToPerformAction = "not authorized to perform this action"
	welcomeBack                  = "welcome back"
	registeredSuccessfully       = "registered successfully"
)

func GoogleLogin(c *gin.Context) {
	googleConfig := config.GoogleSetUpConfig()
	url := googleConfig.AuthCodeURL("randomstate")

	c.Redirect(http.StatusSeeOther, url)
}

func GoogleCallback(c *gin.Context) {
	state := c.Query("state")

	if state != "randomstate" {
		c.String(http.StatusForbidden, "state did not match")
		return
	}

	code := c.Query("code")

	googleConfig := config.GoogleSetUpConfig()

	token, err := googleConfig.Exchange(c, code)
	if err != nil {
		fmt.Fprintln(c.Writer, "could not get token")
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		fmt.Fprintln(c.Writer, "could not get user info")
	}

	userData, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Fprintln(c.Writer, "Json parsing failed")
	}

	var data map[string]interface{}
	err = json.Unmarshal(userData, &data)
	if err != nil {
		fmt.Fprintln(c.Writer, "Json unmarshaling failed")
	}

	val, ero := GoogleAuthValue(c, data)
	if ero != nil {
		fmt.Fprintln(c.Writer, ero)
	}

	frontendUrl := os.Getenv("FRONTEND_URL")

	c.Redirect(http.StatusSeeOther, fmt.Sprintf("%vklock-google-auth/?token=%v", frontendUrl, string(val.Token)))

}

func GoogleAuthValue(c *gin.Context, data map[string]interface{}) (*models.UserAuthResponse, error) {

	authProvider := "Google"

	picture := data["picture"].(string)

	user := &models.User{
		Name:      data["name"].(string),
		Email:     data["email"].(string),
		Photo:     &picture,
		Password:  "",
		UserID:    helpers.GenerateID(),
		Provider:  &authProvider,
		Role:      models.RoleUser,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Generate JWT
	token, err := helpers.CreateJwtToken(user)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf(errorRfTokenMsg)
	}

	// Check for the uniqueness of the email
	var existingUser models.User
	result := database.DB.Where("email = ?", user.Email).First(&existingUser)
	if result.RowsAffected > 0 {

		if existingUser.Password != "" {
			return &models.UserAuthResponse{}, fmt.Errorf("social login not allowed for this account")
		}

		return &models.UserAuthResponse{
			Token:   token,
			Message: fmt.Sprintf("%s %s", welcomeBack, user.Name),
		}, nil
	}

	result = database.DB.Create(user)
	if result.Error != nil {
		return &models.UserAuthResponse{}, result.Error
	}

	return &models.UserAuthResponse{
		Token:   token,
		Message: fmt.Sprintf("%s %s", user.Name, registeredSuccessfully),
	}, nil

}

func GoogleOneTapLogin(input models.GoogleOneTap) (*models.UserAuthResponse, error) {
	provider := "Google"

	// Check if name input field is valid
	if !helpers.IsValidInput(input.Name) {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid name")
	}

	// Check if the input.Email is typeof email
	if !helpers.IsValidEmail(input.Email) {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid email")
	}

	user := &models.User{
		Name:      input.Name,
		Email:     input.Email,
		Photo:     &input.Picture,
		Password:  "",
		UserID:    helpers.GenerateID(),
		Provider:  &provider,
		Role:      models.RoleUser,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	// Generate JWT
	token, err := helpers.CreateJwtToken(user)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf(errorRfTokenMsg)
	}

	// Check for the uniqueness of the email
	var existingUser models.User
	result := database.DB.Where("email = ?", user.Email).First(&existingUser)
	if result.RowsAffected > 0 {

		if existingUser.Password != "" {
			return &models.UserAuthResponse{}, fmt.Errorf("social login not allowed for this account")
		}

		return &models.UserAuthResponse{
			Token:   token,
			Message: fmt.Sprintf("%s %s", welcomeBack, user.Name),
		}, nil
	}

	result = database.DB.Create(user)
	if result.Error != nil {
		return &models.UserAuthResponse{}, result.Error
	}

	return &models.UserAuthResponse{
		Token:   token,
		Message: fmt.Sprintf("%s %s", user.Name, registeredSuccessfully),
	}, nil
}

func RegisterUser(input models.CreateNewUser) (*models.UserAuthResponse, error) {
	provider := "Klock"

	// Check if name input field is valid
	if !helpers.IsValidInput(input.Name) {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid name")
	}

	// Check if the input.Email is typeof email
	if !helpers.IsValidEmail(input.Email) {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid email")
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
		return &models.UserAuthResponse{}, fmt.Errorf("user already exist")
	}

	// Hash password
	hashedPassword, err := helpers.HashPassword(user.Password)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf("rrror hashing password")
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
	token, err := helpers.CreateJwtToken(user)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf(errorRfTokenMsg)
	}

	return &models.UserAuthResponse{
		Message: fmt.Sprintf("%s %s", user.Name, registeredSuccessfully),

		Token: token,
	}, nil
}

func LoginUser(input models.LoginUser) (*models.UserAuthResponse, error) {
	// Check if email input field is valid
	if !helpers.IsValidEmail(input.Email) {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid email")
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

	token, err := helpers.CreateJwtToken(&user)
	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf(errorRfTokenMsg)
	}

	return &models.UserAuthResponse{
		Message: fmt.Sprintf("%s %s", welcomeBack, user.Name),
		Token:   token,
	}, nil

}

func GetUserProfile(c *gin.Context) (*models.UserProfile, error) {
	user, err := helpers.ValidateAccessToken(c)
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

func UpdateUser(c *gin.Context, input models.UpdateUser) (*models.UserAuthResponse, error) {

	res, err := helpers.ValidateAccessToken(c)
	if err != nil {
		return &models.UserAuthResponse{}, err
	}

	user := models.User{}
	userID := res.UserID

	result := database.DB.Model(&user).Where("user_id = ?", userID).Updates(&input)

	if result.Error != nil {
		return &models.UserAuthResponse{}, fmt.Errorf("error updating user")
	}

	var userProfile models.User
	userResult := database.DB.Where("user_id = ?", userID).First(&userProfile)
	if userResult.RowsAffected == 0 {
		return &models.UserAuthResponse{}, fmt.Errorf(userNotFound)
	}

	return &models.UserAuthResponse{
		Message: fmt.Sprintf("%s updated in successfully", userProfile.Name),
		// User: &models.UserProfile{
		// 	UserID:   &userProfile.UserID,
		// 	Name:     &userProfile.Name,
		// 	Email:    &userProfile.Email,
		// 	Role:     &userProfile.Role,
		// 	Photo:    userProfile.Photo,
		// 	Phone:    userProfile.Phone,
		// 	Location: userProfile.Location,
		// 	Gender:   userProfile.Gender,
		// },
	}, nil

}

func CheckCurrentPassword(c *gin.Context, input string) (*models.Message, error) {
	user, err := helpers.ValidateAccessToken(c)
	if err != nil {
		return &models.Message{}, err
	}

	result := database.DB.Where("user_id = ?", user.UserID).First(&user)
	if result.RowsAffected == 0 {
		return &models.Message{}, fmt.Errorf(userNotFound)
	}

	// Check if password is correct
	if !helpers.VerifyPassword(user.Password, input) {
		return &models.Message{}, fmt.Errorf("incorrect password, try again")
	}

	return &models.Message{Message: "Success"}, nil
}

func UpdatePassword(c *gin.Context, input models.UpdatePassword) (*models.Message, error) {

	res, err := helpers.ValidateAccessToken(c)
	if err != nil {
		return &models.Message{}, err
	}

	var (
		user            = models.User{}
		userID          = res.UserID
		currentPassword = input.CurrentPassword
	)

	r := database.DB.Where("user_id = ?", userID).First(&user)
	if r.RowsAffected == 0 {
		return &models.Message{}, fmt.Errorf("user not found")
	}

	// Check if password is correct
	if !helpers.VerifyPassword(user.Password, currentPassword) {
		return &models.Message{}, fmt.Errorf("incorrect password. Try again")
	}

	hashedPassword, err := helpers.HashPassword(input.NewPassword)
	if err != nil {
		return &models.Message{}, fmt.Errorf("error hashing password")
	}

	result := database.DB.Model(&user).Where("user_id = ?", userID).Update("password", &hashedPassword)
	if result.Error != nil {
		return &models.Message{}, fmt.Errorf("error updating password")
	}

	return &models.Message{
		Message: "Password updated successfully",
	}, nil
}

func UpdateAvatar(c *gin.Context, input graphql.Upload) (*models.Message, error) {
	//  Validate access token
	_, err := helpers.ValidateAccessToken(c)
	if err != nil {
		return &models.Message{}, err
	}

	content, err := io.ReadAll(input.File)
	if err != nil {
		return nil, err
	}

	fmt.Println(string(content), "***** file content *****")

	// profilePic, er := helpers.UploadToCloudinary(content, user.UserID, "avatar")
	// if er != nil {
	// 	return &models.Message{}, er
	// }

	// result := database.DB.Model(&user).Where("user_id = ?", user.UserID).Update("photo", profilePic)
	// if result.Error != nil {
	// 	return &models.Message{}, fmt.Errorf("error updating avatar")
	// }

	return &models.Message{
		Message: "profile picture updated successfully",
	}, nil
}

func RequestNewToken(c *gin.Context) (*models.UserAuthResponse, error) {
	refreshToken := c.GetHeader("Authorization")

	if refreshToken == "" {
		return &models.UserAuthResponse{}, fmt.Errorf("refresh token required")
	}

	// Extract the token part from "Bearer <token>"
	tokenParts := strings.Split(refreshToken, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid refresh token format")
	}

	refreshToken = tokenParts[1]

	// Parse and validate the refresh token
	tokenByte, err := jwt.Parse(refreshToken, func(jwtToken *jwt.Token) (interface{}, error) {
		if _, ok := jwtToken.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", jwtToken.Header["alg"])
		}
		return []byte("rf_secret"), nil
	})

	if err != nil {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid refresh token")
	}

	// Extract claims from the refresh token
	claims, ok := tokenByte.Claims.(jwt.MapClaims)
	if !ok || !tokenByte.Valid {
		return &models.UserAuthResponse{}, fmt.Errorf("invalid token claim")
	}

	// Call the function to generate a new access token
	accessToken, er := helpers.CreateJwtToken(&models.User{UserID: claims["userId"].(string)})
	if er != nil {
		return &models.UserAuthResponse{}, fmt.Errorf(er.Error())
	}

	return &models.UserAuthResponse{
		Message: "Token refreshed successfully",
		Token:   accessToken,
	}, nil

}

func GetAllUsers() ([]*models.UserProfile, error) {
	var users []*models.User
	if err := database.DB.Where("role = ?", "USER").Find(&users).Error; err != nil {
		return nil, err
	}

	var userProfiles []*models.UserProfile
	for _, user := range users {
		userProfile := &models.UserProfile{
			UserID:   &user.UserID,
			Name:     &user.Name,
			Email:    &user.Email,
			Role:     &user.Role,
			Photo:    user.Photo,
			Phone:    user.Phone,
			Location: user.Location,
			Gender:   user.Gender,
		}
		userProfiles = append(userProfiles, userProfile)
	}

	return userProfiles, nil
}

func DeleteUser(c *gin.Context) (*models.Message, error) {

	res, err := helpers.ValidateAccessToken(c)
	if err != nil {
		return &models.Message{}, err
	}

	if err := database.DB.Exec("DELETE FROM users WHERE user_id = ?", res.UserID).Error; err != nil {
		return &models.Message{}, fmt.Errorf("error deleting user")
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
		return &models.Message{}, fmt.Errorf("error deleting users")
	}
	return &models.Message{Message: "Successfully deleted all users"}, nil

}
