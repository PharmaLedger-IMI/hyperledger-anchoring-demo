FROM node:10
# create work app directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./src/package*.json ./
RUN npm install

#bundle app source
COPY ./src .

EXPOSE 3000

CMD [ "node" , "app.js" ]