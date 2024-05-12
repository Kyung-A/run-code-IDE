interface IProps {
  [key: string]: string;
}

export const filePath = "compile";

export const fileName: IProps = {
  javascript: "code.js",
  python: "code.py",
  java: "Main.java",
  cpp: "main.cpp",
};
