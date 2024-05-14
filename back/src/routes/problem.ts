import express, { Request, Response } from "express";
import { problemList, problem } from "../mock/problem";
import { exec, execSync } from "child_process";
import { dockerBuild } from "../helper/docker-build";

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
    // dockerBuild();
    // execSync(`docker run --rm -d -it --name test-app kyunga/all-lang:latest`);

    const id = req.params.problemId;
    const data = problem.find((v) => v.id === id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
  }
});

export default router;
