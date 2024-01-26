import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../icons/logo/logo.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [LogoComponent, InputTextModule, ButtonModule, ReactiveFormsModule, NgClass, ProgressSpinnerModule, RouterLink],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {

  isSignUp = false;
  isSubmitting = false;
  displayPassword = false;
  displayConfirmPassword = false;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.isSignUp = data['isSignUp'];
    });
   }

  userAuthForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
    termsAndConditions: new FormControl('', [Validators.required]),
    rememberMe: new FormControl('', [Validators.required])
  },
  {validators: this.confirmPasswordValidator}
   );

   confirmPasswordValidator(control: AbstractControl) {
     return control.get('password')?.value === control.get('confirmPassword')?.value
     ? null : { mismatch: true };
   }

   onSubmit(event: SubmitEvent) {
    event.preventDefault();
     this.isSubmitting = true;
     console.log(this.userAuthForm.value);
   }

   ngOnInit(): void {
       
   }
}
