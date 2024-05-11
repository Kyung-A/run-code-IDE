FROM python:3.9-alpine
RUN apk add --update nodejs npm
RUN apk add openjdk11
RUN apk add g++
COPY src/docker/input.sh /usr/src
WORKDIR /usr/src
VOLUME ["/app"]