package helpers

import (
	"context"
	"fmt"
	"math/rand"
	"mime/multipart"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/graphql/models"
	"github.com/alexedwards/argon2id"
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func IsValidEmail(email string) bool {
	const emailRegex = `^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`

	match, _ := regexp.MatchString(emailRegex, email)
	return match
}

func IsValidInput(input string) bool {
	const validInputString = `^[a-zA-Z0-9\s]+$`

	match, _ := regexp.MatchString(validInputString, input)
	return match
}

func GenerateRandomStrings(length int) string {
	const charset string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	result := make([]byte, length)
	for i := range result {
		result[i] = charset[rand.Intn(len(charset))]
	}
	return string(result)
}

func GenerateID() string {
	randomString := GenerateRandomStrings(30)
	generatedID := fmt.Sprint(randomString)
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


func CreateJwtToken(user *models.User) (string, error) {
	exp := time.Now().Add(time.Hour * 1).Unix()
	claims := jwt.MapClaims{
		"exp":      exp,
		"userId":   user.UserID,
		"name":     user.Name,
		"email":    user.Email,
		"role":     user.Role,
		"photo":    user.Photo,
		"phone":    user.Phone,
		"location": user.Location,
		"gender":   user.Gender,
		
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tkn, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}


	return  tkn, nil
}

func ValidateAccessToken(c *gin.Context) (*models.User, error) {
	accessToken := c.GetHeader("Authorization")

	if accessToken == "" {
		return nil, fmt.Errorf("Unauthorized")
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
		return nil, fmt.Errorf(err.Error())
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("Invalid access token")
	}

	userId, ok := claims["userId"].(string)
	if !ok {
		return nil, fmt.Errorf("Invalid user ID in token claims")
	}

	var user models.User
	result := database.DB.Where("user_id = ?", userId).First(&user)

	if result.RowsAffected == 0 {
		return nil, fmt.Errorf("User not found")
	}

	return &user, nil
}

func CloudinaryCredentials() (*cloudinary.Cloudinary, error) {
	// cldName := os.Getenv("CLOUDINARY_CLOUD_NAME")
	// cldSecret := os.Getenv("CLOUDINARY_API_SECRET")
	// cldKey := os.Getenv("CLOUDINARY_API_KEY")
	cldUrl := os.Getenv("CLOUDINARY_URL")

	// cld, err := cloudinary.NewFromParams(cldName, cldKey, cldSecret)
	// if err != nil {
	// 	return nil, err
	// }
	cld, err := cloudinary.NewFromURL(cldUrl)
	if err != nil {
		return nil, err
	}

	cld.Config.URL.Secure = true

	return cld, nil
}

func UploadToCloudinary(file *multipart.FileHeader, subFolder, productID string) (string, error) {
	ctx := context.Background()
	cld, err := CloudinaryCredentials()
	if err != nil {
		return "", err
	}

	// Open the uploaded file
	openedFile, err := file.Open()
	if err != nil {
		return "", err
	}
	defer openedFile.Close()

	// Construct the folder path in Cloudinary
	folderPath := fmt.Sprintf("klock-ecommerce/%s/%s", subFolder, productID)

	// Remove file extension from file name
	fileName := filepath.Base(file.Filename)
	nameWithoutExt := fileName[:len(fileName)-len(filepath.Ext(fileName))]

	uploadParams := uploader.UploadParams{
		PublicID: folderPath + "/" + nameWithoutExt,
	}

	result, err := cld.Upload.Upload(ctx, openedFile, uploadParams)
	if err != nil {
		return "", err
	}

	imageUrl := result.SecureURL
	return imageUrl, nil
}
