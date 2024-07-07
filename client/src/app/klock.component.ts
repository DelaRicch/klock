import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { AlertComponent } from "@components/alert/alert.component";
import { ClickOutsideDirective } from "@directives/click-outside/click-outside.directive";
import { environment } from "@environment/environment";
import { GOOGLE_ONE_TAP_LOGIN } from "@graphql/user.mutations";
import { googleSignIn } from "@helpers/helpers";
import { AlertService } from "@services/alert/alert.service";
import { AuthService } from "@services/auth/auth.service";
import { RouteTitleService } from "@services/route-title/route-title.service";
import { GoogleCallback, GoogleLoginResponse } from "@type/auth.types";
import { AlertProps } from "@type/types";
import { Apollo } from "apollo-angular";
import { jwtDecode } from "jwt-decode";
import { Subscription } from "rxjs";

@Component({
  selector: "klock-root",
  standalone: true,
  imports: [RouterOutlet, AlertComponent, ClickOutsideDirective],
  providers: [],
  templateUrl: "./klock.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
  angularTitle = inject(Title);
  routeTitleService = inject(RouteTitleService);
  authService = inject(AuthService);
  apollo = inject(Apollo);
  alertService = inject(AlertService);

  googleSignIn = googleSignIn;
  googleAuthUrl = environment.KLOCK_GRAPHQL_URI + "/auth/google";
  googleClientId = environment.GOOGLE_CLIENT_ID;
  subscriptions: Subscription[] = [];

  isAuthenticated = computed(() => {
    return this.authService.isAuthenticated();
  });

  constructor() {
    this.authService.setUserProfile();
    effect(() => {
      window.onload = () => {
        google.accounts.id.initialize({
          client_id: `${this.googleClientId}`,
          callback: (response: GoogleCallback) =>
            this.googleOneTapSignIn(response)
        });
        if (!this.isAuthenticated()) {
          google.accounts.id.prompt();
        }
      };
    });
  }

  googleOneTapSignIn(response: GoogleCallback) {
    const decodedGoogleAuthResponse = jwtDecode<{ [key: string]: string }>(
      response.credential
    );

    this.subscriptions.push(
      this.apollo
        .mutate<GoogleLoginResponse>({
          mutation: GOOGLE_ONE_TAP_LOGIN,
          variables: {
            input: {
              name: decodedGoogleAuthResponse["name"],
              email: decodedGoogleAuthResponse["email"],
              picture: decodedGoogleAuthResponse["picture"]
            }
          }
        })
        .subscribe(({ data }) => {
          if (data) {
            const successMessage = {
              message: data.GoogleOneTap.message,
              status: "success",
              title: "Success"
            } as AlertProps;

            this.alertService.showAlert(successMessage);
            this.authService.setAccessToken(data.GoogleOneTap.token);
          }
        })
    );
  }

  ngOnInit(): void {
    this.routeTitleService.setTitle(this.angularTitle.getTitle());
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
