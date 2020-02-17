FROM node:10

COPY /minitwit/package*.json ./

RUN npm install

COPY /minitwit .

RUN npm run build

RUN rm -rf node_modules

RUN npm i -g serve

CMD (cd /build && serve --single -l 80)
