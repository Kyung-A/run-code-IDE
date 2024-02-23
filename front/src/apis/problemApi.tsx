import axios from "axios";
import { IRequestProblem } from "../types";

export const requestProblemList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/problem`);
};

export const requestProblem = async (data: IRequestProblem) => {
  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/problem/${data.id}`,
    {
      code: data.code,
      lang: data.lang,
    }
  );
};
