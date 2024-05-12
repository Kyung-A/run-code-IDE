export const problemList = [
  {
    id: "0",
    title: "문자열 출력하기",
  },
  {
    id: "1",
    title: "더하기",
  },
  {
    id: "2",
    title: "빼기",
  },
  {
    id: "3",
    title: "곱하기",
  },
  {
    id: "4",
    title: "1998년생인 내가 태국에서는 2541년생?!",
  },
  {
    id: "5",
    title: "두 수 비교하기",
  },
  {
    id: "6",
    title: "알람 시계",
  },
  {
    id: "7",
    title: "직사각형에서 탈출",
  },
  {
    id: "8",
    title: "마지막 카드",
  },
  {
    id: "9",
    title: "분할 정복 거듭제곱",
  },
  {
    id: "10",
    title: "문자열 그대로 출력하기",
  },
];

export const problem = [
  {
    id: "0",
    title: "문자열 출력하기",
    question: "문자열이 주어질 때, 문자열을 출력하는 코드를 작성해 보세요.",
    example: [
      {
        input: "HelloWorld!",
        output: "HelloWorld!",
      },
      {
        input: "KyungA",
        output: "KyungA",
      },
    ],
  },
  {
    id: "1",
    title: "더하기",
    question:
      "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
    example: [
      {
        input: "3 6",
        output: "9",
      },
      {
        input: "16 8",
        output: "24",
      },
    ],
  },
  {
    id: "2",
    title: "빼기",
    question:
      "두 정수 A와 B를 입력받은 다음, A-B를 출력하는 프로그램을 작성하시오.",
    example: [
      {
        input: "3 6",
        output: "-3",
      },
      {
        input: "16 8",
        output: "8",
      },
    ],
  },
  {
    id: "3",
    title: "곱하기",
    question:
      "두 정수 A와 B를 입력받은 다음, A*B를 출력하는 프로그램을 작성하시오.",
    example: [
      {
        input: "1 2",
        output: "2",
      },
      {
        input: "3 4",
        output: "12",
      },
    ],
  },
  {
    id: "4",
    title: "1998년생인 내가 태국에서는 2541년생?!",
    question:
      "ICPC Bangkok Regional에 참가하기 위해 수완나품 국제공항에 막 도착한 팀 레드시프트 일행은 눈을 믿을 수 없었다. 공항의 대형 스크린에 올해가 2562년이라고 적혀 있던 것이었다. 불교 국가인 태국은 불멸기원(佛滅紀元), 즉 석가모니가 열반한 해를 기준으로 연도를 세는 불기를 사용한다. 반면, 우리나라는 서기 연도를 사용하고 있다. 불기 연도가 주어질 때 이를 서기 연도로 바꿔 주는 프로그램을 작성하시오.",
    example: [
      {
        input: "2541",
        output: "1998",
      },
    ],
  },
  {
    id: "5",
    title: "두 수 비교하기",
    question:
      "두 정수 A와 B가 주어졌을 때, A와 B를 비교하는 프로그램을 작성하시오.\nA가 B보다 큰 경우에는 '>'를 출력한다.\nA가 B보다 작은 경우에는 '<'를 출력한다.\nA와 B가 같은 경우에는 '=='를 출력한다.",
    example: [
      {
        input: "1 2",
        output: "<",
      },
      {
        input: "10 2",
        output: ">",
      },
      {
        input: "5 5",
        output: "==",
      },
    ],
  },
  {
    id: "6",
    title: "알람 시계",
    question:
      "상근이는 매일 아침 알람을 듣고 일어난다. 알람을 듣고 바로 일어나면 다행이겠지만, 항상 조금만 더 자려는 마음 때문에 매일 학교를 지각하고 있다.\n상근이는 모든 방법을 동원해보았지만, 조금만 더 자려는 마음은 그 어떤 것도 없앨 수가 없었다.\n이런 상근이를 불쌍하게 보던 창영이는 자신이 사용하는 방법을 추천해 주었다.\n바로 '45분 일찍 알람 설정하기'이다.\n이 방법은 단순하다. 원래 설정되어 있는 알람을 45분 앞서는 시간으로 바꾸는 것이다. 어차피 알람 소리를 들으면, 알람을 끄고 조금 더 잘 것이기 때문이다. 이 방법을 사용하면, 매일 아침 더 잤다는 기분을 느낄 수 있고, 학교도 지각하지 않게 된다.\n현재 상근이가 설정한 알람 시각이 주어졌을 때, 창영이의 방법을 사용한다면, 이를 언제로 고쳐야 하는지 구하는 프로그램을 작성하시오.\n\n입력 : 첫째 줄에 두 정수 H와 M이 주어진다. (0 ≤ H ≤ 23, 0 ≤ M ≤ 59) 그리고 이것은 현재 상근이가 설정한 알람 시간 H시 M분을 의미한다.\n입력 시간은 24시간 표현을 사용한다. 24시간 표현에서 하루의 시작은 0:0(자정)이고, 끝은 23:59(다음날 자정 1분 전)이다. 시간을 나타낼 때, 불필요한 0은 사용하지 않는다.\n\n출력 : 첫째 줄에 상근이가 창영이의 방법을 사용할 때, 설정해야 하는 알람 시간을 출력한다. (입력과 같은 형태로 출력하면 된다.)",
    example: [
      {
        input: "10 10",
        output: "9 25",
      },
      {
        input: "0 30",
        output: "23 45",
      },
      {
        input: "23 40",
        output: "22 55",
      },
    ],
  },
  {
    id: "7",
    title: "직사각형에서 탈출",
    question:
      "한수는 지금 (x, y)에 있다. 직사각형은 각 변이 좌표축에 평행하고, 왼쪽 아래 꼭짓점은 (0, 0), 오른쪽 위 꼭짓점은 (w, h)에 있다. 직사각형의 경계선까지 가는 거리의 최솟값을 구하는 프로그램을 작성하시오.",
    example: [
      {
        input: "6 2 10 3",
        output: "1",
      },
    ],
  },
  {
    id: "8",
    title: "마지막 카드",
    question:
      "N장의 카드가 있다. 각각의 카드는 차례로 1부터 N까지의 번호가 붙어 있으며, 1번 카드가 제일 위에, N번 카드가 제일 아래인 상태로 순서대로 카드가 놓여 있다.\n이제 다음과 같은 동작을 카드가 한 장 남을 때까지 반복하게 된다. 우선, 제일 위에 있는 카드를 바닥에 버린다. 그 다음, 제일 위에 있는 카드를 제일 아래에 있는 카드 밑으로 옮긴다.\n예를 들어 N=4인 경우를 생각해 보자. 카드는 제일 위에서부터 1234 의 순서로 놓여있다. 1을 버리면 234가 남는다. 여기서 2를 제일 아래로 옮기면 342가 된다. 3을 버리면 42가 되고, 4를 밑으로 옮기면 24가 된다. 마지막으로 2를 버리고 나면, 남는 카드는 4가 된다.\nN이 주어졌을 때, 제일 마지막에 남게 되는 카드를 구하는 프로그램을 작성하시오.",
    example: [
      {
        input: "6",
        output: "4",
      },
    ],
  },
  {
    id: "9",
    title: "분할 정복 거듭제곱",
    question:
      "자연수 A를 B번 곱한 수를 알고 싶다. 단 구하려는 수가 매우 커질 수 있으므로 이를 C로 나눈 나머지를 구하는 프로그램을 작성하시오.",
    example: [
      {
        input: "10 11 12",
        output: "4",
      },
    ],
  },
  {
    id: "10",
    title: "문자열 그대로 출력하기",
    question:
      "입력 받은 대로 출력하는 프로그램을 작성하시오.\n\n입력이 주어진다. 입력은 최대 100줄로 이루어져 있고, 알파벳 소문자, 대문자, 공백, 숫자로만 이루어져 있다. 각 줄은 100글자를 넘지 않으며, 빈 줄은 주어지지 않는다. 또, 각 줄은 공백으로 시작하지 않고, 공백으로 끝나지 않는다.",
    example: [
      {
        input: "Hello\\nBaekjoon\\nOnline Judge",
        output: "Hello\\nBaekjoon\\nOnline Judge",
      },
    ],
  },
];

export const problemTestcase = [
  {
    id: "0",
    testcase: [
      {
        input: "HelloWorld!",
        output: "HelloWorld!",
      },
      {
        input: "KyungA",
        output: "KyungA",
      },
      {
        input: "naneun jolla meos-issda",
        output: "naneun jolla meos-issda",
      },
      {
        input: "KyuungA gaejjeol-eo",
        output: "KyuungA gaejjeol-eo",
      },
      {
        input: "Like and subscribe to KyuungA YouTube channel",
        output: "Like and subscribe to KyuungA YouTube channel",
      },
      {
        input: "eojjeolago",
        output: "eojjeolago",
      },
    ],
  },
  {
    id: "1",
    testcase: [
      {
        input: "3 6",
        output: "9",
      },
      {
        input: "2 1",
        output: "3",
      },
      {
        input: "100 12",
        output: "112",
      },
      {
        input: "923854 2345",
        output: "926199",
      },
    ],
  },
  {
    id: "2",
    testcase: [
      {
        input: [-3, 6],
        output: "-9",
      },
      {
        input: [2, 1],
        output: "1",
      },
      {
        input: [-100, -12],
        output: "88",
      },
      {
        input: [77, 10],
        output: "67",
      },
    ],
  },
  {
    id: "3",
    testcase: [
      {
        input: "1 2",
        output: "2",
      },
      {
        input: "3 4",
        output: "12",
      },
      {
        input: "12 5",
        output: "60",
      },
      {
        input: "23564 4",
        output: "94256",
      },
      {
        input: "123 321",
        output: "39483",
      },
      {
        input: "1 1",
        output: "1",
      },
    ],
  },
  {
    id: "4",
    testcase: [
      {
        input: "2541",
        output: "1998",
      },
      {
        input: "9999",
        output: "9456",
      },
      {
        input: "1111",
        output: "568",
      },
      {
        input: "1234",
        output: "691",
      },
      {
        input: "543",
        output: "0",
      },
      {
        input: "555",
        output: "12",
      },
      {
        input: "544",
        output: "1",
      },
      {
        input: "0",
        output: "-543",
      },
      {
        input: "326",
        output: "217",
      },
      {
        input: "2541",
        output: "1998",
      },
    ],
  },
  {
    id: "5",
    testcase: [
      {
        input: "1 2",
        output: "<",
      },
      {
        input: "10 2",
        output: ">",
      },
      {
        input: "5 5",
        output: "==",
      },
      {
        input: "7 14",
        output: "<",
      },
      {
        input: "-10 -16",
        output: ">",
      },
      {
        input: "123 123",
        output: "==",
      },
    ],
  },
  {
    id: "6",
    testcase: [
      {
        input: "10 10",
        output: "9 25",
      },
      {
        input: "0 30",
        output: "23 45",
      },
      {
        input: "23 40",
        output: "22 55",
      },
      {
        input: "1 46",
        output: "1 1",
      },
      {
        input: "1 0",
        output: "0 15",
      },
    ],
  },
  {
    id: "7",
    testcase: [
      {
        input: "6 2 10 3",
        output: "1",
      },
      {
        input: "1 1 5 5",
        output: "1",
      },
      {
        input: "653 375 1000 1000",
        output: "347",
      },
      {
        input: "161 181 762 375",
        output: "161",
      },
    ],
  },
  {
    id: "8",
    testcase: [
      {
        input: "6",
        output: "4",
      },
      {
        input: "32",
        output: "32",
      },
      {
        input: "8",
        output: "8",
      },
      {
        input: "32",
        output: "32",
      },
      {
        input: "16",
        output: "16",
      },
      {
        input: "12",
        output: "8",
      },
      {
        input: "15",
        output: "14",
      },
      {
        input: "20",
        output: "8",
      },
    ],
  },
  {
    id: "9",
    testcase: [
      {
        input: "10 11 12",
        output: "4",
      },
      {
        input: "2147483647 2147483647 100001",
        output: "7569",
      },
      {
        input: "6 11 13",
        output: "11",
      },
      {
        input: "4 1 2",
        output: "0",
      },
      {
        input: "99999 99999 100000",
        output: "99999",
      },
    ],
  },
  {
    id: "10",
    testcase: [
      {
        input: "Hello\\nBaekjoon\\nOnline Judge",
        output: "Hello\\nBaekjoon\\nOnline Judge",
      },
    ],
  },
];
