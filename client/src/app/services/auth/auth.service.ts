import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LogoutUser } from '@store/auth/auth.actions';
import { selectAuth } from '@store/auth/auth.selector';
import { LogOut } from '@store/user/user.actions';
import { selectUser } from '@store/user/user.selector';
import { AuthStateType, UserInfoType } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = {} as UserInfoType;
  auth = {} as AuthStateType;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.store.select(selectUser).subscribe((user) => {
      this.user = user;
    });
    this.store.select(selectAuth).subscribe((auth) => {
      this.auth = auth;
    });
  }

  logOut() {
    this.store.dispatch(LogoutUser());
    this.store.dispatch(LogOut());
    this.router.navigate(['sign-in']);
  }
}
