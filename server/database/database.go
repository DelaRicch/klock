package database

import (
	"fmt"
	"log"
	"os"

	"github.com/DelaRicch/klock/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDb() {

	dsn := fmt.Sprintf("postgresql://%s:%s@klock-go-13287.8nj.gcp-europe-west1.cockroachlabs.cloud:26257/go-klock?sslmode=verify-full", os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"))

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	db.Logger = logger.Default.LogMode(logger.Info)

	// Migrate db models
	if os.Getenv("APP_ENV") == "development" {
		if err := db.AutoMigrate(&models.User{}); err != nil {
			log.Fatalf("Error migrating user model: %v", err)
		}

		if err := db.AutoMigrate(&models.Token{}); err != nil {
			log.Fatalf("Error migrating token model: %v", err)
		}
	}

	DB = db
}

func CloseDb() {
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Failed to get DB instance: %v", err)
	}
	sqlDB.Close()
}
