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
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Number
},

type Query {
    employee(id: String!): Employee!

}


`;