import { Component } from '@angular/core';
import { LogoComponent } from '../../icons/logo/logo.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../../helpers';
import { ActivatedRoute, Route } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [LogoComponent, InputTextModule, ButtonModule, ReactiveFormsModule, NgClass],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  isSignUp = false;

  userAuthForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z\d!@#$%^&*()_+]{8,}')]),
    confirmPassword: new FormControl('', [Validators.required]),
    termsAndConditions: new FormControl('', [Validators.required]),
    rememberMe: new FormControl('', [Validators.required])
  },
   { validators: confirmPasswordValidator});

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.isSignUp = data['isSignUp'];
    });
   }

}
