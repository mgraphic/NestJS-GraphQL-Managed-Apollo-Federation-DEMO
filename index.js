const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const port = 4000;

const gateway = new ApolloGateway();

const server = new ApolloServer({
    gateway,
    subscriptions: false,
    playground: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            // options
        }),
    ],
});

server
    .listen({ port })
    .then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
    .catch((err) => console.log('Error launching server', err));
