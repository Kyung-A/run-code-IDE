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
  question: string;
  param: number;
}
