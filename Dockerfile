FROM node:16.4.2-alpine

WORKDIR /usr/src/app

RUN apk add build-base python3 make curl

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm run start"]
