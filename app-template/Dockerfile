FROM node:15.8.0-alpine3.12

WORKDIR /

ADD package.json ./
ADD yarn.lock ./

RUN yarn install
ADD . .

STOPSIGNAL SIGINT

CMD node app.js