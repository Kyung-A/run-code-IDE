import { execSync } from "child_process";

export const dockerBuild = () => {
  try {
    execSync(`docker build -t myimage:latest -f src/docker/Dockerfile .`);
  } catch (error) {
    console.error(
      `Error occurred while building Docker image: ${(error as any).message}`
    );
    process.exit(1);
  }
};
