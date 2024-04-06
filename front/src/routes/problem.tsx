import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { material } from "@uiw/codemirror-theme-material";
import io from "socket.io-client";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";

import { requestProblem } from "../apis/problemApi";
import { IOutput, IProblem } from "../types";
import { defaultCode } from "../utils/consts";

const Problem = () => {
  const { problemId } = useParams();

  const socket = io("http://localhost:3001/problem", {
    reconnectionDelayMax: 10000,
    query: {
      problem: problemId,
    },
  });

  const [problem, setProblem] = useState<IProblem>();
  const [code, setCode] = useState<string>("");
  const [lang, setLang] = useState<LanguageName>("javascript");
  const [result, setResult] = useState<IOutput>();
  const [error, setError] = useState<string>("");

  const onSubmit = useCallback(() => {
    setResult({});
    setError("");
    socket.emit("join", { room: problemId, id: problemId, code, lang });
  }, [code, lang, problemId, socket]);

  useEffect(() => {
    if (problemId) {
      requestProblem(problemId).then((rep) => setProblem(rep.data));
    }
  }, [problemId]);

  useEffect(() => {
    setResult({});
    switch (lang) {
      case "javascript":
        setCode(defaultCode.javscript);
        break;
      case "python":
        setCode(defaultCode.python);
        break;
      case "java":
        setCode(defaultCode.java);
        break;
      case "cpp":
        setCode(defaultCode.cpp);
        break;
      default:
        break;
    }
  }, [lang]);

  useEffect(() => {
    socket.on("test", (data) => {
      setResult(data);
    });
    socket.on("error", (data) => {
      setError(data);
    });
  }, [socket]);

  return (
    <div>
      <h2>문제</h2>
      <p>{problem?.question}</p>
      <h2>Input</h2>
      <CodeMirror
        value={code}
        onChange={(e) => setCode(e)}
        theme={material}
        height="200px"
        extensions={[loadLanguage(`${lang}`)!]}
      />
      <div style={{ marginTop: "10px" }}>
        <select
          onChange={(e) => setLang(e.target.value as LanguageName)}
          defaultValue="Javascript"
          style={{ width: "100px", height: "30px" }}
        >
          <option>javascript</option>
          <option>python</option>
          <option>java</option>
          <option>cpp</option>
        </select>
        <button
          type="button"
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
        {error !== "" && (
          <p style={{ margin: "0px", color: "#c92c2c" }}>{error}</p>
        )}
        {result && (
          <>
            <div
              style={{
                margin: "0px",
                padding: "0px",
                listStyle: "none",
                color: "#fff",
              }}
            >
              {Object.entries(result).map(([key, value]) => (
                <li key={key}>
                  테스트케이스 {Number(key) + 1} :{" "}
                  <span
                    style={{
                      color: value === false ? "red" : "blue",
                    }}
                  >
                    {value === false ? "실패" : "통과"}
                  </span>
                </li>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Problem;
