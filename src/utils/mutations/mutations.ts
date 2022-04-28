import { gql } from 'apollo-angular';
import { APPLICATION_DATA, TRIP_DATA, USER_DATA } from '../fragments/fragments';

export const SIGN_UP_MUTATION = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $name: String!
    $lastName: String!
    $telephoneNumber: String
    $address: String
  ) {
    signUpUser(
      input: {
        email: $email
        password: $password
        name: $name
        lastName: $lastName
        telephoneNumber: $telephoneNumber
        address: $address
      }
    ) {
      accessToken
      user {
        ...UserData
      }
    }
  }
  ${USER_DATA}
`;

export const LOG_IN_MUTATION = gql`
  mutation logIn($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
      accessToken
      user {
        ...UserData
      }
    }
  }
  ${USER_DATA}
`;

export const SOCIAL_SIGN_IN_MUTATION = gql`
  mutation socialSignIn($token: String!) {
    socialSignIn(input: { token: $token }) {
      accessToken
      user {
        ...UserData
      }
    }
  }
  ${USER_DATA}
`;

export const VALIDATE_TOKEN_MUTATION = gql`
  mutation validateAuthToken($token: String!, $password: String) {
    validateToken(input: { origin: "web", token: $token, password: $password })
  }
`;

export const RESET_USER_PASSWORD_MUTATION = gql`
  mutation resetPW($email: String!) {
    resetUserPassword(input: { origin: "web", email: $email })
  }
`;

export const UPDATE_SELF_PASSWORD_MUTATION = gql`
  mutation updatePassword($newPassword: String!, $oldPassword: String!) {
    updateSelfPassword(
      input: { newPassword: $newPassword, oldPassword: $oldPassword }
    ) {
      passwordUpdated
    }
  }
`;

export const APPLY_TO_TRIP = gql`
  mutation applyToTrip($comments: [String!], $trip: ID!) {
    createSelfApplication(input: { comments: $comments, trip: $trip }) {
      ...ApplicationData
    }
  }
  ${APPLICATION_DATA}
`;

export const CREATE_TRIP = gql`
  mutation CreateTrip($input: CreateTripInput!) {
    createTrip(input: $input) {
      ...TripData
    }
  }
  ${TRIP_DATA}
`;
