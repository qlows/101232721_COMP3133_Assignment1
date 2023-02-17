const {gql} = require('apollo-server');

module.exports = gql`
    type Employee {
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Number!
    }


input CreateEmployeeInput{
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Number!
},

input EditEmployeeInput{
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Number!
},

type Query {
    employee(email: String!): Employee!
    getEmployees: [Employee]!
}

type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(email: String!, input: EditEmployeeInput!): Employee!
    deleteEmployee(email: String!): Employee!
}

`;