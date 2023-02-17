const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

//const express = require('express');
//const userData = require('./MOCK_DATA.json');
//const { graphqlHTTP } = require('express-graphql');
//const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
//const app = express();

// Start the server and connect to MongoDB
const SERVER_PORT = 3000
const MONGODB = "mongodb+srv://qlows:ananinamizuck@cluster0.hm9ineu.mongodb.net/employee_backend?retryWrites=true&w=majority"
mongoose.connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB");
        return server.listen({ port: SERVER_PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((err) => {
        console.log(err, "Couldn't connect to MongoDB");
    });

const typeDefs = require("./router/typeDefs");
const resolvers = require("./router/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

/* const userType = new GraphQLObjectType({
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
*/