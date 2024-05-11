FROM python:3.9-alpine
COPY src/docker/input.sh /usr/src/
COPY compile/code.py /usr/src/
WORKDIR /usr/src/
CMD ["sh", "-c", "./input.sh | python3 code.py"]