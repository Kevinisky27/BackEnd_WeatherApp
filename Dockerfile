FROM node:18.16.0-alpine3.13

WORKDIR /BackEnd_WeatherApp
COPY package.json .
RUN npm install
COPY . .
CMD npm start