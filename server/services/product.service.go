package services

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/DelaRicch/klock/server/database"
	"github.com/DelaRicch/klock/server/graphql/models"
	"github.com/DelaRicch/klock/server/helpers"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func AddProduct(c *gin.Context) {
	newProduct := new(models.Product)
	req, _ := c.MultipartForm()

	validate := validator.New()
	if err := validate.Struct(newProduct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	// Other fields
	newProduct.ProductName = req.Value["productName"][0]
	newProduct.ProductBrand = req.Value["productBrandName"][0]
	newProduct.ProductCategory = req.Value["productCategory"][0]
	newProduct.ProductDescription = req.Value["productDescription"][0]
	newProduct.ProductPrice, _ = strconv.ParseFloat(req.Value["productPrice"][0], 64)
	newProduct.ProductQuantity, _ = strconv.ParseInt(req.Value["productQuantity"][0], 10, 64)
	newProduct.ProductDiscountPercentage, _ = strconv.ParseFloat(req.Value["productDiscount"][0], 64)
	newProduct.CreatedAt = time.Now()
	newProduct.UpdatedAt = time.Now()
	newProduct.ProductsRemaining = newProduct.ProductQuantity

	// Generate Product ID
	productId := helpers.GenerateID()
	newProduct.ProductID = productId

	// Upload cover image to Cloudinary
	coverImage := req.File["productCoverImage"][0]
	coverImageUrl, err := helpers.UploadToCloudinary(coverImage, newProduct.ProductID, "cover-image")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error uploading cover image"})
		return
	}

	// Upload gallery images to Cloudinary
	var galleryImageURLs []string
	for _, galleryImage := range req.File["productGalleryImages"] {
		imageUrl, err := helpers.UploadToCloudinary(galleryImage, newProduct.ProductID, "gallery-images")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "error uploading gallery image"})
			return
		}
		galleryImageURLs = append(galleryImageURLs, imageUrl)
	}

	newProduct.ProductCoverImage = coverImageUrl
	newProduct.ProductGalleryImages = make([]*models.ProductGalleryImage, 0)
	for _, imageUrl := range galleryImageURLs {
		galleryImage := &models.ProductGalleryImage{
			ImageURL: imageUrl,
		}
		newProduct.ProductGalleryImages = append(newProduct.ProductGalleryImages, galleryImage)
	}

	result := database.DB.Create(&newProduct)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "error creating product"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("%s created successfully", newProduct.ProductName)})
}

func AdminAllProducts(c *gin.Context) ([]*models.AdminProduct, error) {
	user, err := helpers.ValidateAccessToken(c)
	if err != nil {
		return nil, err
	}

	if user.Role != "ADMIN" {
		return nil, fmt.Errorf("unauthorized")
	}

	var products []*models.Product
	if err := database.DB.Find(&products).Error; err != nil {
		return nil, err
	}

	var adminProducts []*models.AdminProduct
	for _, product := range products {
		adminProduct := &models.AdminProduct{
			ProductID:          &product.ProductID,
			ProductName:        &product.ProductName,
			ProductBrand:       &product.ProductBrand,
			ProductCategory:    &product.ProductCategory,
			ProductDescription: &product.ProductDescription,
			ProductPrice:       &product.ProductPrice,
			ProductQuantity:    &product.ProductQuantity,
			ProductCoverImage:  &product.ProductCoverImage,
			ProductsSold:       &product.ProductsSold,
		}
		adminProducts = append(adminProducts, adminProduct)
	}

	return adminProducts, nil
}
