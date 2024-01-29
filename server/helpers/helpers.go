package helpers

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/DelaRicch/klock/server/models"
	"github.com/alexedwards/argon2id"
	"github.com/golang-jwt/jwt/v5"
)

func GenerateRandomStrings(length int) string {
	const charset = "01234ABCDEFGHIJKLM567890NOPQRSTUVWXYZ"
	result := make([]byte, length)
	for i := range result {
		result[i] = charset[rand.Intn(len(charset))]
	}
	return string(result)
}

func GenerateID(value string) string {
	randomString := GenerateRandomStrings(15)
	generatedID := fmt.Sprintf("%s-%s", value, randomString)
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
