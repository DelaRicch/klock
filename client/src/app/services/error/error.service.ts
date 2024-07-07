import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GraphQLErrors, NetworkError } from "@apollo/client/errors";
import { AlertService } from "@services/alert/alert.service";
import { AlertProps } from "@type/types";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  alertService = inject(AlertService);

  getNetworkErrorMessage(error: NetworkError | undefined) {
    if (!error) return;
    const err = error as HttpErrorResponse;
    if (!err.error) return;
    const networkError = {
      message: err.error.error ?? "network error",
      status: "error",
      title: "Error"
    } as AlertProps;

    this.alertService.showAlert(networkError);
  }

  getGraphQlErrors(errors: GraphQLErrors | undefined) {
    if (!errors) return;
    if (!errors[0]?.message || errors[0]?.message === undefined) return;

    errors.forEach((err) => {
      const error = {
        message: err.message,
        status: "error",
        title: "Error"
      } as AlertProps;
      console.error(error, "GraphQl error");
      this.alertService.showAlert(error);
    });
  }
}
