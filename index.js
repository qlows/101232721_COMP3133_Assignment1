const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const User = require('./model/user');

const typeDefs = require("./router/typeDefs");
const resolvers = require("./router/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers
});

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