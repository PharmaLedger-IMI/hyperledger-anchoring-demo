#image designed for InitContainer volumes usage

FROM node:alpine

RUN mkdir -p /usr/src/app/scripts
#WORKDIR /usr/src/app/scripts

COPY fillconfiguration.sh  /usr/src/app/scripts/
RUN chmod +x /usr/src/app/scripts/fillconfiguration.sh

# URL from where to git clone
ENV GitCloneURL noURL
# location where to git clone
ENV PATHToGitClone data

RUN apk add --no-cache git
RUN apk add --no-cache openssh
RUN apk add --no-cache --upgrade bash


CMD [ "sh" , "-c", "git clone $GitCloneURL  $PATHToGitClone" ]



