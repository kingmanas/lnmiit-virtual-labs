FROM node:alpine
RUN npm install -g nodemon
WORKDIR /api
EXPOSE 8001
CMD npm install && nodemon ./index.js
