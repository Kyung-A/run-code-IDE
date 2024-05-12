import express, { Request, Response } from "express";
import { problemList, problem } from "../mock/problem";
import { exec } from "child_process";

const router = express.Router();

router.get("/", (_, res: Response) => {
  try {
    res.status(200).send(problemList);
  } catch (e) {
    console.error(e);
  }
});

router.get("/:problemId", (req: Request, res: Response) => {
  try {
    exec(`docker run --rm -d -it --name test-app myimage:latest`);
    const id = req.params.problemId;
    const data = problem.find((v) => v.id === id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
  }
});

export default router;
