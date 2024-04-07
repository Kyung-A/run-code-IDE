import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { copilot } from "@uiw/codemirror-theme-copilot";
import io from "socket.io-client";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";

import { requestProblem } from "../apis/problemApi";
import { IOutput, IProblem } from "../types";
import { defaultCode } from "../utils/consts";
import { Link } from "react-router-dom";

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
    <div className="wrapper">
      <div className="problem">
        <div className="title">
          <Link to="/problemList">코딩테스트</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <h1>{problem?.title}</h1>
        </div>
        <div className="question">
          <h2>문제</h2>
          <p>{problem?.question}</p>
          <div className="example">
            <h2>입력예제</h2>
            <table>
              <th>입력</th>
              <th>출력</th>
              {problem?.example.map((v) => (
                <tr>
                  <td>{v.input}</td>
                  <td>{v.output}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <div className="code-wrapper">
        <div className="select-lang">
          <select
            onChange={(e) => setLang(e.target.value as LanguageName)}
            defaultValue="Javascript"
          >
            <option>javascript</option>
            <option>python</option>
            <option>java</option>
            <option>cpp</option>
          </select>
        </div>
        <div className="codeMirror-wrapper">
          <CodeMirror
            value={code}
            onChange={(e) => setCode(e)}
            theme={copilot}
            height="100%"
            extensions={[loadLanguage(`${lang}`)!]}
          />
        </div>

        <div className="output">
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

        <div className="submit">
          <button type="button" onClick={() => console.log("")}>
            코드 실행
          </button>
          <button type="button" onClick={onSubmit}>
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem;
