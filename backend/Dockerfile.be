FROM node:latest

COPY /minitwit_api ./

RUN npm install -g nodemon

RUN npm install

CMD npm start