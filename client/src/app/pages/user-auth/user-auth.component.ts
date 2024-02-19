import { LogoComponent } from './../../icons/logo/logo.component';
import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserService } from '@services/user/user.service';
import { Store } from '@ngrx/store';

import { AlertProps, LoginUserType, RegisterUserType } from '@type/types';
import {
  UserProfileFailure,
  UserProfileSuccess,
} from '@store/user/user.actions';
import { LoginUserFailure, LoginUserSuccess, RegisterUser } from '@store/auth/auth.actions';
import { InputComponent } from '@components/shared/input/input.component';
import { AlertService } from '@services/alert/alert.service';
import { CheckboxComponent } from '@components/checkbox/checkbox.component';
import { selectAuth } from '@store/auth/auth.selector';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    LogoComponent,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    InputComponent,
    CheckboxComponent
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  isSignUp = false;
  isSubmitting = false;
  displayPassword = false;
  displayConfirmPassword = false;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private store: Store,
    private alertService: AlertService
  ) {
    this.route.data.subscribe((data) => {
      this.isSignUp = data['isSignUp'];
    });
  }

  userAuthForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(''),
    termsAndConditions: new FormControl(false),
    rememberMe: new FormControl(false),
  });

  confirmPasswordValidator(control: AbstractControl) {
    const { password, confirmPassword } = control.value;
    if (password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  termsAndConditionsValidator(control: AbstractControl) {
    const { name, email, password, confirmPassword, termsAndConditions } =
      control.value;
    if (name && email && password && confirmPassword && !termsAndConditions) {
      return { termsNotAccepted: true };
    }

    return null;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.isSubmitting = true;

    if (this.isSignUp) {
      const request = {
        name: this.userAuthForm.value.name,
        email: this.userAuthForm.value.email,
        password: this.userAuthForm.value.password,
        remember: this.userAuthForm.value.rememberMe,
      };

      this.userService.register(request as RegisterUserType).subscribe({
        next: (msg) => {

          const alert: AlertProps = {
            display: true,
            status: 'success',
            title: 'Success',
            message: msg.message,
          }
          this.store.dispatch(RegisterUser({ res: msg }));

          this.alertService.showAlert(alert);
          setTimeout(() => {
            alert.display = false;
          }, 5000)
          this.userAuthForm.reset();
          this.isSubmitting = false;
            this.userService.getProfile().subscribe({
              next: (res) => {
                this.store.dispatch(UserProfileSuccess({ res }));
              },
              error: (error) => {
                this.store.dispatch(UserProfileFailure({ error }));
              },
          });
          this.router.navigate(['admin-dashboard']);
        },
        error: (error) => {

          const alert: AlertProps = {
            display: true,
            status: 'error',
            title: 'Error',
            message: error.error.message,
          }

          this.alertService.showAlert(alert);
          setTimeout(() => {
            alert.display = false;
          }, 5000)
          this.isSubmitting = false;
        },
      });
    } else {
      const request = {
        email: this.userAuthForm.value.email,
        password: this.userAuthForm.value.password,
        remember: this.userAuthForm.value.rememberMe,
      };

      this.userService.login(request as LoginUserType).subscribe({
        next: (msg) => {
          const alert: AlertProps = {
            display: true,
            status: 'success',
            title: 'Success',
            message: msg.message,
          }

          this.alertService.showAlert(alert);
          setTimeout(() => {
            alert.display = false;
          }, 5000)
          this.store.dispatch(LoginUserSuccess({ res: msg }));
          this.userAuthForm.reset();
          this.isSubmitting = false;
          this.userService.getProfile().subscribe({
            next: (res) => {
              this.store.dispatch(UserProfileSuccess({ res }));
            },
            error: (error) => {
              this.store.dispatch(UserProfileFailure({ error }));
            },
          });
          this.router.navigate(['admin-dashboard']);
        },
        error: (err) => {
          const error = {
            message: err.error.message,
            success: false,
          };

          console.log(err);

          const alert: AlertProps = {
            display: true,
            status: 'error',
            title: 'Error',
            message: err.error.message,
          }

          this.alertService.showAlert(alert);
          setTimeout(() => {
            alert.display = false;
          }, 5000)
          this.store.dispatch(LoginUserFailure({ error }));
          this.isSubmitting = false;
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.isSignUp) {
      this.userAuthForm
        .get('name')
        ?.setValidators([Validators.required, Validators.minLength(4)]);
      this.userAuthForm
        .get('password')
        ?.setValidators([
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/
          ),
        ]);
      this.userAuthForm
        .get('confirmPassword')
        ?.setValidators([Validators.required]);
      this.userAuthForm
        .get('termsAndConditions')
        ?.setValidators([Validators.required]);
      this.userAuthForm.setValidators([
        this.termsAndConditionsValidator,
      ]);
    }
  }
}
