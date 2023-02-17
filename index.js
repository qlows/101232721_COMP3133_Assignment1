const express = require('express');
const app = express();
const port = 3000;
const userData = require('./MOCK_DATA.json');
const { graphqlHTTP } = require('express-graphql');


const RootQuery = "query"
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