# POC: Managed Federation Gateway

## POC for testng the integration of a managed federation gateway with Apollo Studio

---

## Setup & Installation

This code requires an account with Apollo Studio (https://studio.apollographql.com)

1. Create a new deployed graph in Apollo Studio

2. Clone this repository to your local dev environment

3. Rename the `.env.example` file to `.env` and replace the `<apollo-server-key>`, `<apollo-graph-name>`, and `<apollo-graph-variant-name>` values:

```
APOLLO_KEY=<apollo-server-key>
APOLLO_GRAPH_ID=<apollo-graph-name>
APOLLO_GRAPH_VARIANT=<apollo-graph-variant-name>
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

## Proxy Caching (optional)

You can optionally run a proxy service via Docker to provide caching of the super-graph that is fed to the gateway server. The cached responses are used when the studio API is unavailable.

### How it works:

1. Change the value of `APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT` in the `.env` file to point to the proxy service:

```
APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=http://localhost:8080/
```

2. Start the cluster: `docker compose up --build`.

3. Watch the logs to see the gateway load: `Schema loaded and ready for execution`.

4. Bring down the api:

    1. Uncomment `return 500 "<b>Down!</b>";` in nginx/apibreaker.conf
    2. Restart nginx: `docker exec -d nestjs-graphql-apollo-federation-demo_apibreaker_1 /etc/init.d/nginx reload`

5. Observe that requests to `nestjs-graphql-apollo-federation-demo_apibreaker_1` have a status code of 500.

6. Restart the gateway with `touch index.js`. Observe that it restarts without issue.

---

Setting up managed federation: https://www.apollographql.com/docs/federation/managed-federation/setup/

NGINX Proxy Caching: https://github.com/apollosolutions/managed-federation-resiliency/tree/main/nginx
