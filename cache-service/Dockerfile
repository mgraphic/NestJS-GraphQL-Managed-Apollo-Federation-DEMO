FROM node:14
WORKDIR /web
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
CMD yarn start
