FROM  openjdk:11 
COPY src/docker/input.sh /usr/src/
COPY compile/Main.java  /usr/src/
WORKDIR /usr/src/
RUN javac Main.java
CMD ["sh", "-c", "./input.sh | java Main"]