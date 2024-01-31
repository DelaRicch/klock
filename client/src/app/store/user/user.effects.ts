import { ApiResponse, User } from '../../../types';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { UserService } from '@services/user/user.service';

@Injectable()
export class UserEffects {
  // login$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.LoginUser),
  //     mergeMap((action) =>
  //       this.userService.login(action.response.user!).pipe(
  //         map((res) => UserActions.LoginUserSuccess({ response: res })),
  //         catchError((error) =>
  //           of(UserActions.LoginUserFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  // register$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.RegisterUser),
  //     mergeMap((action) =>
  //       this.userService.register(action.response.user!).pipe(
  //         map((res) => UserActions.RegisterUserSuccess({ response: res })),
  //         catchError((error) =>
  //           of(UserActions.RegisterUserFailure({ error: error.message }))
  //         )
  //       )
  //     )
  //   )
  // );

  //   signUp$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.LoginUser),
  //     mergeMap((action) =>
  //       this.userService.register(action.user).pipe(
  //         map((user) => UserActions.RegisterUserSuccess({ user })),
  //         catchError((error) => of(UserActions.RegisterUserFailure({ error: error.message })))
  //       )
  //     )
  //   )

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
