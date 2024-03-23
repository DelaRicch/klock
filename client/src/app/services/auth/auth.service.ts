import { Injectable, signal } from '@angular/core';
import { TokenType } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken = signal({} as TokenType);
  RefreshToken = signal({} as TokenType);

  setAccessToken(token: TokenType) {
    this.accessToken.set(token);
    localStorage.setItem('accessToken', JSON.stringify(token));
    console.log(this.accessToken());
  }

  setRefreshToken(token: TokenType) {
    this.RefreshToken.set(token);
    localStorage.setItem('refreshToken', JSON.stringify(token));
  }

  getAccessToken() {
    const token = JSON.parse(localStorage.getItem('accessToken') || '{}');
    if (Object.keys(token).length > 0) this.accessToken.set(token);
    return this.accessToken();
  }

  getRefreshToken() {
    const token = JSON.parse(localStorage.getItem('refreshToken') || '{}');
    if (Object.keys(token).length > 0) this.RefreshToken.set(token);
    return this.RefreshToken();
  }
}
