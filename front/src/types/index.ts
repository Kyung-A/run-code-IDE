export interface IProblemList {
  id: number;
  title: string;
}

export interface IRequestProblem {
  id: string | undefined;
  code: string;
  lang: string;
}
