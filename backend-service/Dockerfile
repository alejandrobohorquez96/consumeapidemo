FROM node:alpine
LABEL maintainer="alvaro.bohorquez@ibm.com"
RUN apk update && apk upgrade

COPY customers.json .
COPY package.json .
COPY index.js .

CMD node index.js

ENV PORT 8080
EXPOSE 8080
