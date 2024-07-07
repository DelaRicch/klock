import Cookies from "cookies-ts";
import { Apollo, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { ApplicationConfig, inject } from "@angular/core";
import { ApolloLink, InMemoryCache } from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "@services/auth/auth.service";
import { environment } from "@environment/environment";
import { jwtDecode } from "jwt-decode";
import { ErrorService } from "@services/error/error.service";
import { LoaderService } from "@services/loader/loader.service";

export function apolloOptionsFactory() {
  const errorService = inject(ErrorService);
  const httpLink = inject(HttpLink);
  const authService = inject(AuthService);
  const loaderService = inject(LoaderService);
  const cookies = new Cookies();

  const uri = environment.KLOCK_GRAPHQL_URI + "/graphql";

  const authLink = new ApolloLink((operation, forward) => {
    // Set current timestamp and check token expiry
    const token = cookies.get("token") as string;
    const currentDate = new Date().getTime();
    const currentTimeStamp = Math.floor(currentDate / 1000);
    let tokenExpiry = currentTimeStamp;
    if (token && token !== "") {
      tokenExpiry = Number(jwtDecode(token).exp);
    }

    if (currentTimeStamp > tokenExpiry) {
      authService.logout();
      return null;
    }

    //set the HTTP headers
    operation.setContext({
      headers: new HttpHeaders({
        authorization: token ? `Bearer ${token}` : ""
      })
    });

    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    loaderService.setInlineLoader(false);
    if (graphQLErrors) {
      errorService.getGraphQlErrors(graphQLErrors);
    }
    if (networkError) {
      errorService.getNetworkErrorMessage(networkError);
    }
  });

  const httpLinkHandler = httpLink.create({ uri });

  const link = ApolloLink.from([errorLink, authLink, httpLinkHandler]);

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: "all",
        fetchPolicy: "cache-first"
      },
      watchQuery: {
        errorPolicy: "all",
        fetchPolicy: "cache-first"
      },
      mutate: {
        errorPolicy: "all"
      }
    }
  };
}

export const graphqlProvider: ApplicationConfig["providers"] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory
  }
];
