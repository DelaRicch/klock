import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment.development';
import { ApiResponse, User } from '../../../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(body: User) {
    console.log(body, "body")
    return this.http.post<ApiResponse>(this.apiUrl + 'login', body)
  }
  
  register(body: User) {
    console.log(body)
    return this.http.post<ApiResponse>(this.apiUrl + 'register', body)
  }


}
