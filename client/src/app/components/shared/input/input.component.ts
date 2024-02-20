import { KeyValuePipe, NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { EyeComponent } from '@components/icons/eye/eye.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [EyeComponent, ReactiveFormsModule, KeyValuePipe, NgFor, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnInit {
  @Input() isShowPassword: boolean = true;
  @Input() type: string = 'text';
  @Input() placeholder: string = 'placeholder';
  @Input() label: string = 'label';
  @Input() id: string = 'input-id';
  @Input() isPassword: boolean = false;
  @Input() control = new FormControl();
  @Input() isRequired: boolean = false;
  @Input() className: string = '';
  @Input() pattern?: string;
  @Input() mismatch?: FormControl;

  getErrorMessages(): Record<string, string> {
    if (this.type === 'password' || this.mismatch) {
      return {
        required: "Field can't be empty",
        minlength: 'Field should be at least eight characters',
        pattern: 'Strength required: 8+ characters, include numbers & symbols.',
        mismatch: 'Passwords do not match',
      };
    } else if (this.type === 'email') {
 
      return {
        required: "Field can't be empty",
        email: 'Invalid email address',
        pattern: 'Invalid email format',
      };
    } else {
      return {
        required: "Field can't be empty",
        minlength: 'Field should be at least four characters',
      };
    }
  }

  toggleIsShowPassword() {
    this.isShowPassword = !this.isShowPassword;
    if (this.type == 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  matchValidator(controlToMatch: FormControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return controlToMatch.value === control.value ? null : { mismatch: true };
    };
  }

  ngOnInit(): void {
    if (this.pattern) {
      this.control.setValidators([Validators.pattern(this.pattern)]);
    }
    if (this.mismatch) {
      this.control.setValidators([Validators.required, this.matchValidator(this.mismatch)]);
    }
  }
}
