# POC: Managed Federation Gateway

## POC for testng the integration of a managed federation gateway with Apollo Studio

---

## Setup & Installation

This code requires an account with Apollo Studio (https://studio.apollographql.com)

1. Create a new deployed graph in Apollo Studio

2. Clone this repository to your local dev environment

3. Rename the **_.env.example_** file to **_.env_** and replace the _`<apollo-graph-key>`_,
   _`<apollo-graph-name>`_, and _`<apollo-graph-variant-name>`_ values:

```sh
APOLLO_KEY=<apollo-graph-key>
APOLLO_GRAPH_ID=<apollo-graph-name>
APOLLO_GRAPH_VARIANT=<apollo-graph-variant-name>
```

4. Install NPM packages in the root app and both GraphQL server instances:

```sh
npm install
cd nest-graphql-orders
npm install
cd ../nest-graphql-products
npm install
```

## Startup

1. Open a new terminal inside the root of this repository

2. Start servers:

```sh
npm start
```

3. In a new terminal window, run the publisher after the server instances are fully running:

```sh
npm run publish
```

4. Optionally you can restore the db.json back to the original state (requires restarting of
   the services):

```sh
npm run restore
```

5. Testing the playground and voyager mapping:
    1. Gateway:
        1. Playground: http://localhost:4000/graphql
        2. Voyager: http://localhost:4000/
    2. Orders:
        1. Playground: http://localhost:4001/graphql
        2. Voyager: http://localhost:4001/
    3. Products:
        1. Playground: http://localhost:4002/graphql
        2. Voyager: http://localhost:4002/

---

# Managed Federation Resiliency (Optional)

This section contains explorations for adding resiliency to an Apollo Gateway server using managed
federation.

## Approach #1: Nginx Caching Proxy

Configure your gateway to request schema updates from an Nginx instance that proxies to Apollo Studio.
The instance can be configured to return stale data if Apollo Studio is unreachable.

### Setup:

1. Start Docker Services

```sh
npm run proxy
```

2. Modify **_.env_** envrionment settings to use the caching method approach #1

```sh
# # use this value when you ARE NOT using any the optional caching methods
# APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=https://uplink.api.apollographql.com/


# # use this value ONLY when you ARE using the optional caching method approach #1 (Approach #1: Nginx Caching Proxy)
APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=http://localhost:8080/


# # use these values ONLY when you ARE using the optional caching method approach #2  (Approach #2: Build Status Webhook)
# APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=http://localhost:8090/
# SDL_BACKUP_ENDPOINT=http://localhost:5000/backup-sdl
```

3. Restart GraphQL instances

4. Publish the subgraphs

```sh
npm run publish
```

### Testing:

1. Bring down the api:

    1. Uncomment _`return 500 "<b>Down!</b>";`_ in _nginx/apibreaker.conf_.

    2. Restart nginx: _`docker exec -d webhook_apibreaker_1 /etc/init.d/nginx reload`_.

2. Observe that requests to **_apibreaker_1_** have a status code of **_500_**

3. Restart the gateway by restarting GraphQL instances. Observe that it restarts without issue.

## Approach #2: Build Status Webhook

Register a [Build Status webhook][webhook] in Apollo Studio that stores the
supergraph SDL each time the graph changes. If the gateway can't connect to
studio, use the stored SDL instead.

### Setup:

1. Start Docker Services

```sh
npm run webhook
```

2. Modify **_.env_** envrionment settings to use the caching method approach #2

```sh
# # use this value when you ARE NOT using any the optional caching methods
# APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=https://uplink.api.apollographql.com/


# # use this value ONLY when you ARE using the optional caching method approach #1 (Approach #1: Nginx Caching Proxy)
# APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=http://localhost:8080/


# # use these values ONLY when you ARE using the optional caching method approach #2  (Approach #2: Build Status Webhook)
APOLLO_SCHEMA_CONFIG_DELIVERY_ENDPOINT=http://localhost:8090/
SDL_BACKUP_ENDPOINT=http://localhost:5000/backup-sdl
```

3. Restart GraphQL instances

4. Make the cache-service webhook endpoint available to studio:

    1. Install ngrok: _`brew install ngrok`_

    2. Run the ngrok proxy: _`ngrok http 5000`_

    3. Copy the http forwarding url (something like: http://a1b2c3d4e5f6.ngrok.io)

    4. [Register your webhook in Apollo Studio][register].

### Testing:

1. Trigger a schema change with [_`npm run publish`_][publish]. Observe that a file is written
   inside **_cache-service/tmp/._**

2. Bring down the api:

    1. Uncomment _`return 500 "<b>Down!</b>";`_ in _nginx/apibreaker.conf_.

    2. Restart nginx: _`docker exec -d webhook_apibreaker_1 /etc/init.d/nginx reload`_.

3. Observe that requests to **_apibreaker_1_** have a status code of **_500_**

4. Restart the gateway by restarting GraphQL instances. Observe that it restarts without issue.

5. Make another schema change. Observe that the gateway updates after the webhook is triggered.

[register]: https://www.apollographql.com/docs/studio/schema-change-integration/#webhook-format
[publish]: https://www.apollographql.com/docs/rover/subgraphs/#publishing-a-subgraph-schema-to-apollo-studio
[webhook]: https://www.apollographql.com/docs/studio/build-status-notification/

---

Setting up managed federation: https://www.apollographql.com/docs/federation/managed-federation/setup/

Managed Federation Resiliency: https://github.com/apollosolutions/managed-federation-resiliency
