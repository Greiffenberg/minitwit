FROM node:latest

COPY /minitwit_api ./

RUN npm install

CMD npm start