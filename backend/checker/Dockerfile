FROM node:alpine
RUN npm install -g nodemon
WORKDIR /checker
EXPOSE 9000
CMD npm install && nodemon ./index.js