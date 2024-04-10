export interface IProblemList {
  id: number;
  title: string;
}

export interface IProblemInput {
  id: string | undefined;
  code: string;
  lang: string;
}

export interface IProblem {
  id: string | undefined;
  title: string;
  question: string;
  example: {
    input: string;
    output: string | number | number[];
  }[];
}

export interface IOutput {
  index?: number;
  input?: string;
  output?: any;
  result?: any;
}
