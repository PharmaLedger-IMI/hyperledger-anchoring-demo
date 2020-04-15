#image designed for InitContainer volumes usage

FROM node:alpine

# URL from where to git clone
ENV GitCloneURL noURL
# location where to git clone
ENV PATHToGitClone data

RUN apk add --no-cache git
RUN apk add --no-cache openssh

CMD [ "sh" , "-c", "git clone $GitCloneURL  $PATHToGitClone; sleep 2" ]



