import { execSync } from "child_process";

interface IProps {
  [key: string]: {
    name: string;
    path: string;
  };
}

const build: IProps = {
  javascript: { name: "node:16", path: "src/docker/js/Dockerfile" },
  python: { name: "python:3", path: "src/docker/python/Dockerfile" },
  java: { name: "openjdk:11", path: "src/docker/java/Dockerfile" },
  cpp: { name: "cpp:latest", path: "src/docker/cpp/Dockerfile" },
};

export const dockerBuild = (lang: string) => {
  try {
    execSync(`docker build -t ${build[lang].name} -f ${build[lang].path} .`);
  } catch (error) {
    console.error(
      `Error occurred while building Docker image: ${(error as any).message}`
    );
    process.exit(1);
  }
};
