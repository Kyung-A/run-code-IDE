import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { material } from "@uiw/codemirror-theme-material";
import { requestProblem } from "../apis/problemApi";

const defaultCode = `function solution (n, m) {
  let result = 0;
  result = n + m;
  return result;
}`;

const Problem = () => {
  const { problemId } = useParams();

  const [code, setCode] = useState<string>(defaultCode);
  const [lang, setLang] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const onSubmit = useCallback(() => {
    requestProblem({ id: problemId, code, lang }).then((rep) =>
      setResult(rep.data)
    );
  }, [code, lang, problemId]);

  return (
    <div>
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
