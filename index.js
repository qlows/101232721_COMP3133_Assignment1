const express = require('express');
const app = express();
const port = 3000;
const userData = require('./MOCK_DATA.json');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        //id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        salary: { type: GraphQLInt },
    )},
})

const RootQuery = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        getAllUsers: {
            type: new graphql.GraphQLList(userType),
            args: { first_name: { type: GraphQLString } },
            resolve: (parent, args) => {
                return userData //.filter(user => user.first_name === args.first_name);
            },
        },
    )},
})
const Mutation = "mutation"

const schema = new GraphQLSchema({
    query: RootQuery, mutation: Mutation
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})