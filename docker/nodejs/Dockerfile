FROM node:12.14-alpine

COPY ./app /app
RUN apk add --update yarn python make g++
RUN cd /app && yarn install

ENTRYPOINT yarn --cwd ./app prod

EXPOSE 80 5555
