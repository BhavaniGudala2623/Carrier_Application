import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  {
    getUsers {
        id
        dealerName
        personName
        phoneNumber
        state
        city
        zip
        street
        email
        password
       
      }
  }
`;

export const GET_USERS_BY_COUNT = gql`
  {
    getUsersByCount {
        id
        dealerName
        personName
        phoneNumber
        state
        city
        zip
        street
        email
        password
       
      }
  }
`;

export const GET_ITEMS_QUERY = gql`
query GetAllItems($pageSize: Int!, $exclusiveStartKey: UserKeyType) {
  getAllItems(pageSize: $pageSize, exclusiveStartKey: $exclusiveStartKey) {
      items {
        id
        dealerName
        personName
        phoneNumber
        state
        city
        zip
        street
        email
        password
      }
      exclusiveStartKey{
        id
      }
    }
  }
`;

export const GET_ITEMS_BY_STATE_AND_CITY_QUERY = gql`
query getUserByStateAndCity($state: String!, $city: String!) {
  getUserByStateAndCity(state: $state, city: $city) {
        id
        dealerName
        personName
        phoneNumber
        state
        city
        zip
        street
        email
        password     
    }
  }
`;

export const VIEW_USERS = gql`
  query ($id: String) {
    getUser(id: $id) {
        id
        dealerName
        personName
        phoneNumber
        state
        city
        zip
        street
        email
        password
    }
  }
`;

export const ADD_USER = gql`

  mutation createUser($dealerName: String!, $personName: String!, $phoneNumber: String!, $state: String!, $city: String!, $zip: String!, $street: String!, $email: String!, $password: String!) {
    createUser(dealerName: $dealerName, personName: $personName, phoneNumber: $phoneNumber,  state: $state, city: $city, zip: $zip, street: $street, email: $email, password: $password)
    {
      id
      dealerName
      personName
      phoneNumber
      state
      city
      zip
      street
      email
      password
  }
  }
`;


export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    RegisterUser(name: $name, email: $email, password: $password){
      id
      name
      email
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    LoginUser(email: $email, password: $password){
      id
      name
      email
      token
    }
  }
`;



export const EDIT_USER = gql`
mutation($dealerName: String, $personName: String, $phoneNumber: String, $state: String, $city: String, $zip: String, $street: String, $email: String, $password: String) {
    updateUserInfo(dealerName: $dealerName, personName: $personName, phoneNumber: $phoneNumber,  state: $state, city: $city, zip: $zip, street: $street, email: $email, password: $password)
  }
`;

export const DELETE_USER = gql`
  mutation($id: Int) {
    deleteUser(id: $id)
  }
`;
