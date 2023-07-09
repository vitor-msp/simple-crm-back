FROM node:18.16.0-alpine as builder
RUN mkdir /simplecrm
WORKDIR /simplecrm
COPY . .
RUN npm install
RUN npm run build

FROM node:18.16.0-alpine
RUN mkdir /simplecrm
WORKDIR /simplecrm
COPY --from=builder /simplecrm/dist ./dist
COPY package.json .
COPY .env .
RUN npm install --only=production
EXPOSE $SERVER_PORT
ENTRYPOINT ["npm", "run", "start"]