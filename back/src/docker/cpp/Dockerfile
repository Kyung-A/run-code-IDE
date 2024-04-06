FROM alpine:latest
RUN apk update && apk add --no-cache gcc g++ make
WORKDIR /usr/src/
COPY dist/main.cpp  /usr/src/
RUN g++ -o main main.cpp
CMD ["./main"]
