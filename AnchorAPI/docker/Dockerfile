FROM node:10
# create work app directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

#bundle app source
COPY . .

EXPOSE 3000

CMD [ "node" , "app.js" ]