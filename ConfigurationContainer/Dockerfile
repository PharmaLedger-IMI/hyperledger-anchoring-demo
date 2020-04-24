#image designed for InitContainer volumes usage

FROM node:alpine

RUN mkdir -p /usr/src/app/scripts
WORKDIR /usr/src/app/scripts

COPY fillconfiguration.sh  ./
RUN chmod +x fillconfiguration.sh

# URL from where to git clone
ENV GitCloneURL noURL
# location where to git clone
ENV PATHToGitClone data

RUN apk add --no-cache git
RUN apk add --no-cache openssh
RUN apk add --no-cache --upgrade bash


CMD [ "sh" , "-c", "/fillconfiguration.sh $GitCloneURL  $PATHToGitClone" ]



