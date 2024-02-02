import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../icons/logo/logo.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserService } from '@services/user/user.service';
import { User } from '../../../types';
import { ToastService } from '@services/toast/toast.service';
import { Store } from '@ngrx/store';
import {
  LoginUserFailure,
  LoginUserSuccess,
} from '../../store/auth/auth.actions';
import { UserProfileFailure, UserProfileSuccess } from '../../store/user/user.actions';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    LogoComponent,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    NgClass,
    ProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  isSignUp = false;
  isSubmitting = false;
  displayPassword = false;
  displayConfirmPassword = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private store: Store
  ) {
    this.route.data.subscribe((data) => {
      this.isSignUp = data['isSignUp'];
    });
  }

  userAuthForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
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
        rememberMe: this.userAuthForm.value.rememberMe,
      };

      this.userService.register(request as User).subscribe({
        next: (msg) => {
          const res = {
            message: msg.message,
            success: true,
          };
          this.toastService.showToast(res);
          this.userAuthForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          const err = {
            message: error.error.message,
            success: false,
          };
          this.toastService.showToast(err);
          this.isSubmitting = false;
        },
      });
    } else {
      const request = {
        email: this.userAuthForm.value.email,
        password: this.userAuthForm.value.password,
        remember: this.userAuthForm.value.rememberMe,
      };

      this.userService.login(request as User).subscribe({
        next: (msg) => {
          const res = {
            message: msg.message,
            success: true,
          };
          this.store.dispatch(LoginUserSuccess({ res: msg }));
          this.toastService.showToast(res);
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
        },
        error: (err) => {
          const error = {
            message: err.error.message,
            success: false,
          };
          this.store.dispatch(LoginUserFailure({ error }));
          this.toastService.showToast(err);
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
        this.confirmPasswordValidator,
      ]);
    }
  }
}
