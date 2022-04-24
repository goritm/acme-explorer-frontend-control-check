import { gql } from 'apollo-angular';

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
        id
        pictures
        title
        ticket
        manager {
          id
          name
          lastName
          profilePicture
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
    }
  }
`;

export const GET_TRIP = gql`
  query getTrip($id: ID!) {
    getTripById(id: $id) {
      id
      pictures
      title
      ticket
      manager {
        id
        name
        lastName
        profilePicture
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
  }
`;
