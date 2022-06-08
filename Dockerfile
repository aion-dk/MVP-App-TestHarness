FROM node:16.15.2-alpine

WORKDIR /usr/src/app

RUN apk add curl

COPY package*.json ./

RUN npm install #&& npm install -g @angular/cli@latest

ENV CHROME_BIN "/usr/bin/chromium-browser"

COPY . .

CMD ["npm run start"]
