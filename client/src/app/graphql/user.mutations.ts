import { gql } from "apollo-angular";

export const SIGN_UP_USER = gql`
  mutation CreateUser($input: CreateNewUser!) {
    CreateUser(input: $input) {
      message
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUser!) {
    LoginUser(input: $input) {
      message
      token
    }
  }
`;

export const GOOGLE_ONE_TAP_LOGIN = gql`
  mutation GoogleOneTap($input: GoogleOneTap!) {
    GoogleOneTap(input: $input) {
      message
      token
    }
  }
`;
