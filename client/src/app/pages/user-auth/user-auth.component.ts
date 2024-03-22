import { Component, HostBinding, inject, OnInit } from '@angular/core';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

import { AlertProps, LoginUserType, RegisterUserType } from '@type/types';

import { InputComponent } from '@components/shared/input/input.component';
import { AlertService } from '@services/alert/alert.service';
import { CheckboxComponent } from '@components/shared/checkbox/checkbox.component';
import { LogoComponent } from '@icons/logo/logo.component';

@Component({
  selector: 'klock-user-auth',
  standalone: true,
  imports: [
    LogoComponent,
    ReactiveFormsModule,
    NgClass,
    RouterLink,
    InputComponent,
    CheckboxComponent,
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  alertService = inject(AlertService);

  @HostBinding("class") get hostClass(){
    return "flex flex-col";
  }

  isSignUp = false;
  isSubmitting = false;
  displayPassword = false;
  displayConfirmPassword = false;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  userAuthForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
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


    } else {
      const request = {
        email: this.userAuthForm.value.email,
        password: this.userAuthForm.value.password,
        remember: this.userAuthForm.value.rememberMe,
      };

    }
  }

  ngOnInit(): void {
    this.isSignUp = this.route.snapshot.data['isSignUp'];

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
      this.userAuthForm.setValidators([this.termsAndConditionsValidator]);
    }
  }
}
