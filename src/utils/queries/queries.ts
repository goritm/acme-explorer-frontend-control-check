import { gql } from 'apollo-angular';
import { TRIP_DATA, TRIP_USER_DATA } from '../fragments/fragments';

export const GET_USER = gql`
  query Self {
    self {
      id
      email
      name
      lastName
      telephoneNumber
      address
      profilePicture
      role
    }
  }
`;

export const LIST_TRIPS = gql`
  query listTrips($start: Int, $limit: Int, $where: JSON) {
    listTrips(input: { start: $start, limit: $limit, where: $where }) {
      count
      data {
        ...TripData
      }
    }
  }
  ${TRIP_DATA}
`;

export const LIST_APPLICATIONS = gql`
  query listApplications($start: Int, $limit: Int, $where: JSON) {
    listApplications(input: { start: $start, limit: $limit, where: $where }) {
      count
      data {
        id
        comments
        explorer {
          ...TripUserData
        }
        manager {
          ...TripUserData
        }
        reasonRejected
        state
        trip {
          ...TripData
        }
      }
    }
  }
  ${TRIP_DATA}
  ${TRIP_USER_DATA}
`;

export const GET_TRIP = gql`
  query getTrip($id: ID!) {
    getTripById(id: $id) {
      ...TripData
    }
  }
  ${TRIP_DATA}
`;
