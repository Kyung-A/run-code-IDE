FROM alpine:latest
RUN apk update && apk add --no-cache gcc g++ make
WORKDIR /usr/src/
COPY src/docker/input.sh /usr/src/
COPY compile/main.cpp  /usr/src/
RUN g++ -o main main.cpp
CMD ["sh", "-c", "./input.sh | ./main"]