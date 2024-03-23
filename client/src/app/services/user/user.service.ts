import { Injectable, signal } from '@angular/core';
import { UserInfoType } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfile = signal({} as UserInfoType);

  setUserProfile(user: UserInfoType) {
    this.userProfile.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (Object.keys(user).length > 0) this.userProfile.set(user);
    console.log(this.userProfile())
    return this.userProfile();
  }
} 
