const { gql } = require("apollo-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


module.exports = gql`
   type Employee {
       first_name: String!
       last_name: String!
       email: String!
       gender: String!
       salary: Float!
   }
   type User {
       username: String!
       email: String!
       password: String!
   }
     
     input SignInInput {
       username: String!
       password: String!
         }
     
   input CreateEmployeeInput{
       first_name: String!
       last_name: String!
       email: String!
       gender: String!
       salary: Float!
   },
   input EditEmployeeInput{
       first_name: String!
       last_name: String!
       email: String!
       gender: String!
       salary: Float!
   }
   type Query {
       employee(ID: ID!): Employee!
       getEmployees: [Employee]!
       User: User!
   }
   type Mutation {
       createEmployee(input: CreateEmployeeInput!): Employee!
       updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee
       deleteEmployee(ID: ID!): Employee!
       createUser(username: String!, email: String!, password: String!): User
       signIn(input: SignInInput!): SuccessResponse!
   }

   type SuccessResponse {
    success: Boolean!
    message: String
    }

   input EmployeeUpdateInput {
       first_name: String
       last_name: String
       email: String
       gender: String
       salary: Float
   }

   extend type Query {
    me: User
  }
  
  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): SuccessResponse!
  }
`;