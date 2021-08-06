const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloGateway } = require('@apollo/gateway');
const { join } = require('path');
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginCacheControl,
} = require('apollo-server-core');

(async () => {
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

    // const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();

    app.get('/', function (req, res) {
        res.sendFile(join(__dirname, 'index.html'));
    });

    server.applyMiddleware({ app });

    await new Promise((resolve) => app.listen({ port }, resolve));
    console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
    return { server, app };
})();
