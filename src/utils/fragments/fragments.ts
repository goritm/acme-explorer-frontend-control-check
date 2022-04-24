import { gql } from 'apollo-angular';

export const TRIP_USER_DATA = gql`
  fragment TripUserData on TripsUser {
    id
    email
    name
    lastName
    profilePicture
  }
`;

export const TRIP_DATA = gql`
  fragment TripData on Trip {
    id
    pictures
    title
    ticket
    manager {
      ...TripUserData
    }
    description
    state
    stages {
      id
      description
      title
      price
    }
    price
    startDate
    endDate
  }
  ${TRIP_USER_DATA}
`;
