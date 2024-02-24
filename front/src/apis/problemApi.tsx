import axios from "axios";
import { IProblemInput } from "../types";

export const requestProblemList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/problem`);
};

export const requestProblem = async (id: string) => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/problem/${id}`);
};

export const requestProblemOutput = async (data: IProblemInput) => {
  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/problem/${data.id}`,
    {
      code: data.code,
      lang: data.lang,
    }
  );
};
