import axios from "axios";

export const requestProblemList = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/problem`);
};

export const requestProblem = async (id: string) => {
  return await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/api/problem/${id}`
  );
};
