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
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl(''),
    termsAndConditions: new FormControl(''),
    rememberMe: new FormControl('')
  },
   );

   confirmPasswordValidator(control: AbstractControl) {
     return control.get('password')?.value === control.get('confirmPassword')?.value
     ? null : { mismatch: true };
   }

   termsAndConditionsValidator(control: AbstractControl) {
    const { name, email, password, confirmPassword, termsAndConditions } = control.value;
    if (name && email && password && confirmPassword && !termsAndConditions) {
      return { termsNotAccepted: true };
    }
  
    return null;
  }

   onSubmit(event: SubmitEvent) {
    event.preventDefault();
     this.isSubmitting = true;
     console.log(this.userAuthForm.value);
   }

   ngOnInit(): void {
       if (this.isSignUp) {
          this.userAuthForm.get("name")?.setValidators([Validators.required, Validators.minLength(4)])
          this.userAuthForm.get("password")?.setValidators([Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/)])
          this.userAuthForm.get("confirmPassword")?.setValidators([Validators.required])
          this.userAuthForm.get("termsAndConditions")?.setValidators([Validators.required])
          this.userAuthForm.setValidators(this.confirmPasswordValidator )
          this.userAuthForm.setValidators(this.termsAndConditionsValidator )
       }
   }
}
