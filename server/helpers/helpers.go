package helpers

import (
	"fmt"
	"math/rand"
	"regexp"
	"strings"
	"time"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/graphql/models"
	"github.com/alexedwards/argon2id"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func IsValidEmail(email string) bool {
	const emailRegex = `^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`

	match, _ := regexp.MatchString(emailRegex, email)
	return match
}

func GenerateRandomStrings(length int) string {
	const charset = "01234ABCDEFGHIJKLM567890NOPQRSTUVWXYZ"
	result := make([]byte, length)
	for i := range result {
		result[i] = charset[rand.Intn(len(charset))]
	}
	return string(result)
}

func GenerateID(value string) string {
	currentTime := time.Now().Unix()
	randomString := GenerateRandomStrings(15)
	generatedID := fmt.Sprintf("%s-%s%v", value, randomString, currentTime)
	return generatedID
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := argon2id.CreateHash(password, argon2id.DefaultParams)
	if err != nil {
		return "", err
	}
	return hashedPassword, nil
}

func VerifyPassword(hashedPassword, password string) bool {
	match, err := argon2id.ComparePasswordAndHash(password, hashedPassword)
	if err != nil {
		return false
	}
	return match
}

func CreateJwtToken(user *models.User) (string, string, int64, int64, error) {
	exp := time.Now().Add(time.Hour * 1).Unix()
	rfExp := time.Now().Add(time.Hour * 24 * 30).Unix()
	claims := jwt.MapClaims{
		"exp":     exp,
		"userId":  user.UserID,
		"isAdmin": user.Role == "ADMIN",
	}

	rfClaims := jwt.MapClaims{
		"exp":    rfExp,
		"userId": user.UserID,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tkn, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", "", 0, 0, err
	}

	rfToken := jwt.NewWithClaims(jwt.SigningMethodHS256, rfClaims)
	refreshTkn, rfErr := rfToken.SignedString([]byte("rf_secret"))
	if rfErr != nil {
		return "", "", 0, 0, rfErr
	}

	return refreshTkn, tkn, exp, rfExp, nil
}

func ValidateAccessToken(ctx *gin.Context) (*models.User, error) {
	accessToken := ctx.GetHeader("Authorization")

	if accessToken == "" {
		return nil, fmt.Errorf("Unauthrized")
	}

	tokenParts := strings.Split(accessToken, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		return nil, fmt.Errorf("invalid access token format")		
	}

	accessToken = tokenParts[1]

	// parse and validate access token 
	token, err := jwt.Parse(accessToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret"), nil
	})
	if err != nil {
		return nil, fmt.Errorf("invalid access token: %v", err)
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid access token")
	}

	userId, ok := claims["userId"].(string)
	if !ok {
		return nil, fmt.Errorf("invalid user ID in token claims")
	}

	var user models.User
	result := database.DB.Where("user_id = ?", userId).First(&user)

	if result.RowsAffected == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return &user, nil
}
