FROM node:carbon

RUN mkdir /src
RUN mkdir /app

WORKDIR /src
COPY package*.json ./
RUN npm install gulp -g
RUN npm install

WORKDIR /app
