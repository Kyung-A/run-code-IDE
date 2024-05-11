FROM node:16-alpine
COPY src/docker/input.sh /usr/src/
COPY compile/code.js /usr/src/
WORKDIR /usr/src/
CMD ["sh", "-c", "./input.sh | node code.js"]