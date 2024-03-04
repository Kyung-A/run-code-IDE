import axios from "axios";
import { IProblemInput } from "../types";

export const requestProblemList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/problem`);
};

export const requestProblem = async (id: string) => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/problem/${id}`);
};
