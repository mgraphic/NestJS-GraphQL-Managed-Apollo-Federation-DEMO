# POC: Managed Federation Gateway

## POC for testng the integration of a managed federation gateway with Apollo Studio

---

## Setup & Installation

This code requires an account with Apollo Studio (https://studio.apollographql.com)

1. Create a new deployed graph in Apollo Studio

2. Clone this repository to your local dev environment

3. Rename the `.env.example` file to `.env` and replace the `<apollo-server-key>` and `<apollo-graph-name>` values:

```
APOLLO_KEY=<apollo-server-key>
APOLLO_GRAPH_ID=<apollo-graph-name>
APOLLO_GRAPH_VARIANT=sandbox
APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=https://uplink.api.apollographql.com/

GRAPHQL_SUBGRAPH_ENDPOINT_ORDERS=http://localhost:4001/graphql
GRAPHQL_SUBGRAPH_ENDPOINT_PRODUCTS=http://localhost:4002/graphql
```

4. Install NPM packages in the root app and both GraphQL server instances:

```
npm install
cd nest-graphql-orders
npm install
cd ../nest-graphql-products
npm install
```

## Startup

1. Open a new terminal inside the root of this repository

2. Start servers:

```
npm start
```

3. In a new terminal window, run the publisher after the server instances are fully running:

```
npm run publish
```

4. Optionally you can restore the db.json back to the original state (requires restarting of the services):

```
npm run restore
```

---

Setting up managed federation: https://www.apollographql.com/docs/federation/managed-federation/setup/
