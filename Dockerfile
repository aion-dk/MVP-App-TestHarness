FROM node:16.4.2-alpine

WORKDIR /usr/src/app

RUN apk add build-base python3 make chromium chromium-chromedriver

COPY package*.json ./

RUN npm install

ENV CHROME_BIN "/usr/bin/chromium"

COPY . .

CMD ["npm run start"]
