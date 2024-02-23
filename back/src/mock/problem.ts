export const problemList = [
  {
    id: "1",
    title: "더하기",
  },
  {
    id: "2",
    title: "빼기",
  },
];

export const problem = [
  {
    id: "1",
    question:
      "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
    testcase: [
      {
        input: [3, 6],
        output: {
          type: "number",
          result: 9,
        },
      },
      {
        input: [2, 1],
        output: {
          type: "number",
          result: 3,
        },
      },
      {
        input: [100, 12],
        output: {
          type: "number",
          result: 123,
        },
      },
      {
        input: [923854, 2345],
        output: {
          type: "number",
          result: 926199,
        },
      },
    ],
  },
  {
    id: "2",
    question:
      "두 정수 A와 B를 입력받은 다음, A-B를 출력하는 프로그램을 작성하시오.",
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
];
