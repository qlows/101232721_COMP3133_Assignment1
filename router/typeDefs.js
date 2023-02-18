const { gql } = require('apollo-server');

module.exports = gql`
    type Employee {
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
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
},

type Query {
    employee(ID: ID!): Employee!
    getEmployees: [Employee]!
}

type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee
    deleteEmployee(ID: ID!): Employee!
}
input EmployeeUpdateInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
  }
`;