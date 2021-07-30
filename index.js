const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginCacheControl,
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
        // The max age is calculated in seconds
        ApolloServerPluginCacheControl({ defaultMaxAge: 30 }),
    ],
    persistedQueries: {
        ttl: 900, // 15 minutes
    },
});

server
    .listen({ port })
    .then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
    .catch((err) => console.log('Error launching server', err));
