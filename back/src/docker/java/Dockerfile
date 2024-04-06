FROM openjdk:11
# 소스 코드를 복사합니다.
COPY dist/Main.java  /usr/src/
# 작업 디렉토리를 설정합니다.
WORKDIR /usr/src/
# 변경되지 않은 부분은 캐시를 사용하여 빌드합니다.
RUN javac Main.java
# 실행 명령어를 설정합니다.
CMD ["java", "Main"]