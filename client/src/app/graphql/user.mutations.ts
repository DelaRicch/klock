import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUser!) {
    LoginUser(input: $input) {
      message
      token {
        refreshToken {
          expiration
          value
        }
        accessToken {
          value
          expiration
        }
      }
      user {
        email
        gender
        location
        name
        phone
        photo
        role
        userID
      }
    }
  }
`;
