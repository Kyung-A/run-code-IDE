export const problemList = [
  {
    id: "1",
    title: "더하기",
  },
  {
    id: "2",
    title: "빼기",
  },
  {
    id: "0",
    title: "문자열 출력하기",
  },
  {
    id: "3",
    title: "특수문자 출력하기",
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
    title: "행렬 덧셈",
  },
  {
    id: "7",
    title: "직사각형에서 탈출",
  },
  {
    id: "8",
    title: "세로읽기",
  },
  {
    id: "8",
    title: "최댓값",
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
        output: 9,
      },
      {
        input: "16 8",
        output: 24,
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
        output: -3,
      },
      {
        input: "16 8",
        output: 8,
      },
    ],
  },
  {
    id: "3",
    title: "특수문자 출력하기",
    question: "다음과 같이 출력하도록 코드를 작성해 주세요.",
    example: [
      {
        input: `!@#$%^&*(\'"<>?:;`,
        output: `!@#$%^&*(\'"<>?:;`,
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
        output: 1998,
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
    title: "행렬 덧셈",
    question:
      "N*M크기의 두 행렬 A와 B가 주어졌을 때, 두 행렬을 더하는 프로그램을 작성하시오.\n입력 : 첫째 줄에 행렬의 크기 N 과 M이 주어진다. 둘째 줄부터 N개의 줄에 행렬 A의 원소 M개가 차례대로 주어진다. 이어서 N개의 줄에 행렬 B의 원소 M개가 차례대로 주어진다. N과 M은 100보다 작거나 같고, 행렬의 원소는 절댓값이 100보다 작거나 같은 정수이다.\n출력 : 첫째 줄부터 N개의 줄에 행렬 A와 B를 더한 행렬을 출력한다. 행렬의 각 원소는 공백으로 구분한다.",
    example: [
      {
        input: `3 3
        1 1 1
        2 2 2
        0 1 0
        3 3 3
        4 4 4
        5 5 100`,
        output: `4 4 4
        6 6 6
        5 6 100`,
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
    title: "세로읽기",
    question:
      "아직 글을 모르는 영석이가 벽에 걸린 칠판에 자석이 붙어있는 글자들을 붙이는 장난감을 가지고 놀고 있다.\n이 장난감에 있는 글자들은 영어 대문자 ‘A’부터 ‘Z’, 영어 소문자 ‘a’부터 ‘z’, 숫자 ‘0’부터 ‘9’이다. 영석이는 칠판에 글자들을 수평으로 일렬로 붙여서 단어를 만든다. 다시 그 아래쪽에 글자들을 붙여서 또 다른 단어를 만든다.",
    example: [
      {
        input: `ABCDE
        abcde
        01234
        FGHIJ
        fghij`,
        output: "Aa0FfBb1GgCc2HhDd3IiEe4Jj",
      },
    ],
  },
  {
    id: "9",
    title: "최댓값",
    question:
      "9*9 격자판에 쓰여진 81개의 자연수 또는 0이 주어질 때, 이들 중 최댓값을 찾고 그 최댓값이 몇 행 몇 열에 위치한 수인지 구하는 프로그램을 작성하시오.\n입력 : 첫째 줄부터 아홉 번째 줄까지 한 줄에 아홉 개씩 수가 주어진다. 주어지는 수는 100보다 작은 자연수 또는 0이다.\n출력 : 첫째 줄에 최댓값을 출력하고, 둘째 줄에 최댓값이 위치한 행 번호와 열 번호를 빈칸을 사이에 두고 차례로 출력한다. 최댓값이 두 개 이상인 경우 그 중 한 곳의 위치를 출력한다.",
    example: [
      {
        input: `3 23 85 34 17 74 25 52 65
        10 7 39 42 88 52 14 72 63
        87 42 18 78 53 45 18 84 53
        34 28 64 85 12 16 75 36 55
        21 77 45 35 28 75 90 76 1
        25 87 65 15 28 11 37 28 74
        65 27 75 41 7 89 78 64 39
        47 47 70 45 23 65 3 41 44
        87 13 82 38 31 12 29 29 80`,
        output: `90
        5 7`,
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
        input: "Like and subscribe to KyuungA's YouTube channel",
        output: "Like and subscribe to KyuungA's YouTube channel",
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
        output: 9,
      },
      {
        input: "2 1",
        output: 3,
      },
      {
        input: "100 12",
        output: 112,
      },
      {
        input: "923854 2345",
        output: 926199,
      },
    ],
  },
  {
    id: "2",
    testcase: [
      {
        input: [-3, 6],
        output: {
          type: "number",
          result: -9,
        },
      },
      {
        input: [2, 1],
        output: {
          type: "number",
          result: 1,
        },
      },
      {
        input: [-100, -12],
        output: {
          type: "number",
          result: 88,
        },
      },
      {
        input: [77, 10],
        output: {
          type: "number",
          result: 67,
        },
      },
    ],
  },
  {
    id: "3",
    testcase: [
      {
        input: `!@#$%^&*(\'"<>?:;`,
        output: `!@#$%^&*(\'"<>?:;`,
      },
      {
        input: `!@#$%^"<>?:;`,
        output: `!@#$%^"<>?:;`,
      },
      {
        input: `!@\#$%^"<'>?:;'`,
        output: `!@\#$%^"<'>?:;'`,
      },
    ],
  },
  {
    id: "4",
    testcase: [
      {
        input: "2541",
        output: 1998,
      },
      {
        input: "9999",
        output: 9456,
      },
      {
        input: "1111",
        output: 568,
      },
      {
        input: "1234",
        output: 691,
      },
      {
        input: "543",
        output: 0,
      },
      {
        input: "555",
        output: 12,
      },
      {
        input: "544",
        output: 1,
      },
      {
        input: "0",
        output: -543,
      },
      {
        input: "326",
        output: 217,
      },
      {
        input: "2541",
        output: 1998,
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
        input: `3 3
        1 1 1
        2 2 2
        0 1 0
        3 3 3
        4 4 4
        5 5 100`,
        output: `4 4 4
        6 6 6
        5 6 100`,
      },
      {
        input: `3 3
        1 1 1
        2 2 2
        0 1 0
        3 3 3
        4 4 4
        5 5 100`,
        output: `4 4 4
        6 6 6
        5 6 100`,
      },
      {
        input: `3 3
        1 1 1
        2 2 2
        0 1 0
        3 3 3
        4 4 4
        5 5 100`,
        output: `4 4 4
        6 6 6
        5 6 100`,
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
        input: `ABCDE
        abcde
        01234
        FGHIJ
        fghij`,
        output: "Aa0FfBb1GgCc2HhDd3IiEe4Jj",
      },
      {
        input: `AABCDD
        afzz
        09121
        a8EWg6
        P5h3kx`,
        output: "Aa0aPAf985Bz1EhCz2W3D1gkD6x",
      },
    ],
  },
  {
    id: "9",
    testcase: [
      {
        input: `3 23 85 34 17 74 25 52 65
        10 7 39 42 88 52 14 72 63
        87 42 18 78 53 45 18 84 53
        34 28 64 85 12 16 75 36 55
        21 77 45 35 28 75 90 76 1
        25 87 65 15 28 11 37 28 74
        65 27 75 41 7 89 78 64 39
        47 47 70 45 23 65 3 41 44
        87 13 82 38 31 12 29 29 80`,
        output: `90
        5 7`,
      },
      {
        input: `9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 9
        9 9 9 9 9 9 9 9 9 10`,
        output: `10
        9 9`,
      },
      {
        input: `0 0 0 0 0 0 0 0 1
        0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0
        0 0 0 0 0 0 0 0 0`,
        output: `1
        1 9`,
      },
    ],
  },
];
