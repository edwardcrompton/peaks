FROM node:carbon

RUN mkdir /src
RUN mkdir /app

WORKDIR /src
COPY package*.json ./
RUN npm install gulp -g

WORKDIR /app
RUN npm install
