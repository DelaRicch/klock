import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { Store } from '@ngrx/store';
import { AuthStateType, LoginUserType, RegisterUserType, UserStateType } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private store: Store) {}

  login(body: LoginUserType) {
    return this.http.post<AuthStateType>(this.apiUrl + 'login', body);
  }

  register(body: RegisterUserType) {
    return this.http.post<AuthStateType>(this.apiUrl + 'register', body);
  }

  getProfile() {
    return this.http.get<UserStateType>(this.apiUrl + 'user-profile');
  }
}
