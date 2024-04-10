FROM  openjdk:11 
COPY dist/Main.java  /usr/src/
WORKDIR /usr/src/
RUN javac Main.java
CMD ["java", "Main"]