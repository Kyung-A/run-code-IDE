import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { material } from "@uiw/codemirror-theme-material";

import { requestProblem, requestProblemOutput } from "../apis/problemApi";
import { IProblem } from "../types";

const defaultCode = (param: string) => {
  return `function solution (${param}) {
  let result = 0;
  return result;
}`;
};

const Problem = () => {
  const { problemId } = useParams();

  const [problem, setProblem] = useState<IProblem>();
  const [code, setCode] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onSubmit = useCallback(() => {
    requestProblemOutput({ id: problemId, code, lang }).then((rep) =>
      setResult(rep.data)
    );
  }, [code, lang, problemId]);

  useEffect(() => {
    if (problemId) {
      requestProblem(problemId).then((rep) => setProblem(rep.data));
    }
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const param = Array.from(
        { length: problem.param },
        (_, i) => `param${i + 1}`
      ).join(", ");
      const code = defaultCode(param);
      setCode(code);
    }
  }, [problem]);

  return (
    <div>
      <h2>문제</h2>
      <p>{problem?.question}</p>
      <h2>Input</h2>
      <CodeMirror
        value={code}
        onChange={(e) => setCode(e)}
        extensions={[javascript({ jsx: true })]}
        theme={material}
        height="200px"
      />
      <div style={{ marginTop: "10px" }}>
        <select
          onChange={(e) => setLang(e.target.value)}
          style={{ width: "100px", height: "30px" }}
        >
          <option>Javascript</option>
          <option>Python</option>
          <option>Java</option>
          <option>C++</option>
        </select>
        <button
          onClick={onSubmit}
          style={{ width: "100px", height: "30px", marginLeft: "8px" }}
        >
          제출하기
        </button>
      </div>
      <h2>Output</h2>
      <div
        style={{
          border: "1px solid #ccc",
          width: "100%",
          height: "200px",
          padding: "20px 20px",
          boxSizing: "border-box",
          backgroundColor: "#2e3235",
        }}
      >
        <pre style={{ margin: "0px", color: "#fff" }}>{result}</pre>
      </div>
    </div>
  );
};

export default Problem;
