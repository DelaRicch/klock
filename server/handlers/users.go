package handlers

// func GetUserProfile(ctx *gin.Context) {
// 	user, err := helpers.ValidateAccessToken(ctx)
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		ctx.JSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized", "success": false})
// 		return
// 	}

// 	userProfile := models.UserProfile{
// 		Name:     user.Name,
// 		Email:    user.Email,
// 		UserID:   user.UserID,
// 		Role:     user.Role,
// 		Photo:    user.Photo,
// 		Phone:    user.Phone,
// 		Location: user.Location,
// 		Gender:   user.Gender,
// 	}

// 	ctx.JSON(http.StatusOK, gin.H{"user": userProfile, "success": true})
// }

// func DeleteAllUsers(ctx *gin.Context) {
// 	if err := database.DB.Exec("DELETE FROM users WHERE role = 'USER'").Error; err != nil {
// 		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error(), "success": false})
// 		return
// 	}
// 	ctx.JSON(http.StatusOK, gin.H{"message": "Successfully delete all users", "success": true})
// }
