FROM node:latest

COPY backend/minitwit_api ./

RUN npm install

CMD npm start