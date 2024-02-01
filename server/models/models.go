package models

import "gorm.io/gorm"

type Token struct {
	Value      string `json:"value"`
	Expiration int64  `json:"expiration"`
}

type User struct {
	gorm.Model

	Name       string `json:"name" gorm:"text;not null;default:null"`
	Email      string `json:"email" gorm:"text;not null;default:null"`
	Password   string `json:"password" gorm:"text;default:''"`
	UserID     string `json:"userId" gorm:"text;not null;default:null"`
	Role       string `json:"role" gorm:"text;not null;default:null"`
	RememberMe bool   `json:"remember" gorm:"bool;default:false"`
	Photo      string `json:"photo" gorm:"text;default:null"`
	Phone      string `json:"phone" gorm:"text;default:null"`
	Gender     string `json:"gender" gorm:"text;default:null"`
	Location   string `json:"location" gorm:"text;default:null"`
	SocialId   string `json:"socialId" gorm:"text;default:null"`
	Provider   string `json:"provider" gorm:"text;default:null"`
}

type UserProfile struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	UserID   string `json:"userId"`
	Role     string `json:"role"`
	Photo    string `json:"photo"`
	Phone    string `json:"phone"`
	Location string `json:"location"`
	Gender   string `json:"gender"`
}
