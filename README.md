# Run Code IDE

> 코딩테스트용 Web IDE

## 주요기능

- 코딩테스트를 별도의 컴파일러 설치 없이 온라인에서 풀 수 있습니다.
- Javascript, Python, Java, C++ 언어로 문제를 풀 수 있습니다.

## 시작 가이드

### 요구사항

- Node.js 20.x
- Docker

### Backend

<pre><code>$ cd back
$ npm install
$ npm run dev
</code></pre>

### Frontend

<pre><code>$ cd front
$ npm install
$ npm run dev
</code></pre>

## 페이지 구성

| 목록 화면                                                     | 코딩테스트 화면                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------- |
| <img src="front/public/1.png" width="100%" alt="목록 화면" /> | <img src="front/public/2.png" width="100%" alt="코딩테스트 화면" /> |

| 코딩테스트 화면 - 코드 실행                                                     | 코딩테스트 화면 - 제출하기                                                     |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| <img src="front/public/3.png" width="100%" alt="코딩테스트 화면 - 코드 실행" /> | <img src="front/public/4.png" width="100%" alt="코딩테스트 화면 - 제출하기" /> |

| 코딩테스트 화면 - 다이얼로그                                                    |
| ------------------------------------------------------------------------------- |
| <img src="front/public/5.png" width="50%" alt="코딩테스트 화면 - 다이얼로그" /> |

## 프로젝트 동기 및 목표

Node.js 환경에서 클라이언트에게 다른 언어로 입력된 코드를 받아 샌드박스 환경에서 코드를 실행하는 방법을 학습하고, 이를 적용하여 결괏값을 반환하는 프로그램을 만듭니다

## 구현 내용

클라이언트는 React, 서버는 Express.js, 컴파일 환경은 Docker를 활용했습니다. <br />
프로그램 동작 방식은 다음과 같습니다. 유저는 원하는 프로그래밍 언어를 고른 뒤, 해당 문제에 맞는 코드를 작성합니다. 유저가 [코드 실행] 및 [제출하기] 버튼을 누르면 작성한 코드는 Socket 통신 서버에 전송됩니다. 유저가 작성한 코드는 back/compile 디렉토리에 해당 언어에 맞는 파일로 만듭니다.
해당 언어에 맞는 Dockerfile을 실행시켜 유저의 코드 파일을 복사해 Docker내 임시파일로 저장하고, 이미지 생성, 컨테이너를 띄웁니다.
유저가 사용해야할 입력값은 example 또는 testcase 데이터를 이용해 컴파일된 Docker 컨테이너에 echo 쉘 명령어로 실시간으로 할당시킵니다 <br />
[코드 실행]으로 진행했을 경우에는 출력 값을 그대로 반환해주고, [제출하기]로 진행했을 경우에는 testcase의 output과 유저의 결괏값이 맞는지 틀린지에 대한 값을 출력해줍니다. <br />
모든 example, testcase가 진행된 후에는 해당 Docker 컨테이너를 삭제하고, 코드 파일도 삭제합니다.

## 프로젝트를 진행하며 느낀점

이 프로젝트를 통해서 Docker를 처음 사용해봤고, Javascript 환경이라도 가상머신을 이용하면 다른 언어를 받아서 처리할 수 있다는걸 배웠습니다. 또한, Node.js를 평소에는 API CRUD 만들때 써봤는데 처음으로 child process 함수들을 이용해보면서 Node.js에 대해 한층 더 깊이 탐구할 수 있는 계기가 되었습니다. [관련 블로그 글](https://kyung-a.tistory.com/45)

## 아쉬운 점 및 개선 사항

1. Docker 실행될때 굉장히 느립니다. 이 부분은 제 개인 노트북 문제일 확률이 높다고는 생각이 듭니다.
2. 컴파일이 진행될때 클라이언트 쪽에서 Socket 연결이 끊겼다는 에러를 반환합니다. 실제로 정말 끊기진 않았고, 실행에 문제는 없으나 이러한 에러를 왜 반환하는건지 아직 의문인 상태입니다.
3. 현재 코딩테스트 input이 될 값을 띄어쓰기 정도만 포함된 문제로밖에 못하는 것입니다. "3" 또는 "3 7 4" 이런 값은 가능한데, "1 2 3\n5 6 7" 이런 값이 안됩니다. 쉘 명령어를 <code>echo -e "1 2 3\n5 6 7"</code> 이렇게 작성을 해보았으나, 클라이언트 측에서 출력할때 <code>-e 1</code> 이렇게만 출력됩니다. 컨테이너 안에서 shell 명령어가 실행되거나, shell 파일을 읽어오도록 수정해보았으나 해결되지 못했고, bash 에러가 떠서 이 부분도 수정을 해보았으나, 아직까지 해결하지 못 했습니다. 이 부분은 공부가 좀 더 필요할 것 같습니다.
