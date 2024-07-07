import {
  Component,
  HostBinding,
  HostListener,
  inject,
  OnDestroy,
  OnInit
} from "@angular/core";

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { InputComponent } from "@components/shared/input/input.component";
import { AlertService } from "@services/alert/alert.service";
import { CheckboxComponent } from "@components/shared/checkbox/checkbox.component";
import { LogoComponent } from "@icons/logo/logo.component";
import { ButtonComponent } from "@components/shared/button/button.component";
import { AuthService } from "@services/auth/auth.service";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { LOGIN_USER, SIGN_UP_USER } from "@graphql/user.mutations";
import { LoaderService } from "@services/loader/loader.service";
import { AlertProps } from "@type/types";
import { LoginResponse, SignUpResponse } from "@type/auth.types";
import { googleSignIn } from "@helpers/helpers";

@Component({
  selector: "klock-user-auth",
  standalone: true,
  imports: [
    LogoComponent,
    ReactiveFormsModule,
    RouterLink,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    SvgIconComponent
  ],
  templateUrl: "./user-auth.component.html",
  styleUrl: "./user-auth.component.css"
})
export class UserAuthComponent implements OnInit, OnDestroy {
  googleSignIn = googleSignIn;

  router = inject(Router);
  route = inject(ActivatedRoute);
  alertService = inject(AlertService);
  authService = inject(AuthService);
  apollo = inject(Apollo);
  loaderService = inject(LoaderService);
  subscriptions: Subscription[] = [];

  successAlert = {
    message: "Success",
    status: "success",
    title: "Success"
  } as AlertProps;

  isSignUp = false;
  displayPassword = false;
  displayConfirmPassword = false;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  userAuthForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(this.emailPattern)
    ]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl(""),
    termsAndConditions: new FormControl(false),
    rememberMe: new FormControl(false)
  });

  @HostBinding("class") get hostClass() {
    return "flex flex-col";
  }

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

  @HostListener("keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    if (this.userAuthForm.invalid) return;
    if (event.key === "Enter") {
      event.preventDefault();
      this.onSubmit();
    }
  }

  onSubmit() {
    this.loaderService.setInlineLoader(true);
    if (this.isSignUp) {
      this.signUp();
    } else {
      this.login();
    }
  }

  signUp() {
    const request = {
      name: this.userAuthForm.value.name,
      email: this.userAuthForm.value.email,
      password: this.userAuthForm.value.password,
      role: "USER"
    };

    this.subscriptions.push(
      this.apollo
        .mutate<SignUpResponse>({
          mutation: SIGN_UP_USER,
          variables: {
            input: request
          }
        })
        .subscribe(({ data }) => {
          if (data) {
            this.loaderService.setInlineLoader(false);
            this.successAlert = {
              ...this.successAlert,
              message: data.CreateUser.message
            };
            this.authService.setAccessToken(data.CreateUser.token);
            this.alertService.showAlert(this.successAlert);
            this.authService.setUserProfile();
            this.router.navigate(["admin-dashboard"]);
          }
        })
    );
  }

  login() {
    const request = {
      email: this.userAuthForm.value.email,
      password: this.userAuthForm.value.password,
      rememberMe: this.userAuthForm.value.rememberMe
    };

    this.subscriptions.push(
      this.apollo
        .mutate<LoginResponse>({
          mutation: LOGIN_USER,
          variables: {
            input: request
          }
        })
        .subscribe(({ data }) => {
          if (data) {
            this.loaderService.setInlineLoader(false);
            this.successAlert = {
              ...this.successAlert,
              message: data.LoginUser.message
            };
            this.authService.setAccessToken(data.LoginUser.token);
            this.alertService.showAlert(this.successAlert);
            this.authService.setUserProfile();
            this.router.navigate(["admin-dashboard"]);
          }
        })
    );
  }

  ngOnInit(): void {
    this.isSignUp = this.route.snapshot.data["isSignUp"];

    if (this.isSignUp) {
      this.userAuthForm
        .get("name")
        ?.setValidators([Validators.required, Validators.minLength(4)]);
      this.userAuthForm
        .get("password")
        ?.setValidators([
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/
          )
        ]);
      this.userAuthForm
        .get("confirmPassword")
        ?.setValidators([Validators.required]);
      this.userAuthForm
        .get("termsAndConditions")
        ?.setValidators([Validators.required]);
      this.userAuthForm.setValidators([this.termsAndConditionsValidator]);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
