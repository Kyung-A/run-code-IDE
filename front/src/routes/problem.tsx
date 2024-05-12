import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, Link, useBlocker, useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { copilot } from "@uiw/codemirror-theme-copilot";
import io from "socket.io-client";
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs";

import { requestProblem } from "../apis/problemApi";
import { IOutput, IProblem } from "../types";
import { defaultCode } from "../utils/consts";

interface IDialog {
  title: string;
  text: string;
}

const Problem = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  let blocker = useBlocker(true);

  const socket = io("http://localhost:3001/problem", {
    reconnection: true,
    query: {
      problem: problemId,
    },
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [problem, setProblem] = useState<IProblem>();
  const [code, setCode] = useState<string>("");
  const [lang, setLang] = useState<LanguageName>("javascript");
  const [result, setResult] = useState<IOutput[] | null>();
  const [output, setOutput] = useState<IOutput[] | null>();
  const [error, setError] = useState<string | null>();
  const [dialogText, setDialogText] = useState<IDialog | null>();

  const onSubmit = useCallback(() => {
    setResult(null);
    setOutput(null);
    setError(null);
    socket.emit("submit", { room: problemId, id: problemId, code, lang });
  }, [code, lang, problemId, socket]);

  const onClickCodeRun = useCallback(() => {
    setResult(null);
    setOutput(null);
    setError(null);
    socket.emit("codeRun", { room: problemId, id: problemId, code, lang });
  }, [code, lang, problemId, socket]);

  useEffect(() => {
    if (problemId) {
      requestProblem(problemId).then((rep) => setProblem(rep.data));
    }
  }, [problemId]);

  useEffect(() => {
    setResult(null);
    setOutput(null);
    setError(null);
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
      if (data.every((v: IOutput) => v.output !== null)) {
        setTimeout(() => {
          data.some((v: IOutput) =>
            !v.output
              ? setDialogText({
                  title: "실패",
                  text: "아쉽게도 테스트에 통과하지 못 했습니다.",
                })
              : setDialogText({
                  title: "성공",
                  text: "모든 테스트를 통과헸습니다. 축하드립니다!",
                })
          );
          dialogRef.current?.showModal();
        }, 500);
      }
    });
    socket.on("output", (data) => {
      setOutput(data);
    });
    socket.on("error", (data) => {
      setError(data);
    });
  }, [socket]);

  useEffect(() => {
    const onBeforeUnload = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [socket]);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const isTrue = window.confirm("변경사항이 저장되지 않을 수 있습니다.");

      if (isTrue) {
        blocker.proceed();
        navigate("/");
      } else {
        blocker.reset();
      }
    }
  }, [blocker, navigate]);

  return (
    <>
      <div className="wrapper">
        <div className="problem">
          <div className="title">
            <Link to="/">코딩테스트</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
                <tbody>
                  <tr>
                    <th>입력</th>
                    <th>출력</th>
                  </tr>
                  {problem?.example.map((v, i) => {
                    const input = v.input.includes("\\n")
                      ? v.input.split("\\n").join("\n")
                      : v.input;
                    const output =
                      typeof v.output === "string" && v.output.includes("\\n")
                        ? v.output.split("\\n").join("\n")
                        : v.output;

                    return (
                      <tr key={i}>
                        <td style={{ whiteSpace: "pre-line" }}>{input}</td>
                        <td style={{ whiteSpace: "pre-line" }}>{output}</td>
                      </tr>
                    );
                  })}
                </tbody>
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
            {error && (
              <p style={{ margin: "0px", color: "#c92c2c" }}>{error}</p>
            )}
            {result && (
              <>
                <h3>체점 결과</h3>
                <ul className="result-list">
                  {result.map((v) => (
                    <li key={v.index}>
                      <span className="title">테스트케이스 {v.index} </span>
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {v.output === null ? (
                        <span className="loading">로딩중...</span>
                      ) : (
                        <span
                          style={{
                            color: v.output === false ? "#c92c2c" : "#004fe7",
                          }}
                        >
                          {v.output === false ? "실패" : "통과"}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {output && (
              <>
                <h3>실행 결과</h3>
                {output.map((v, i) => {
                  const input = v.input?.includes("\\n")
                    ? v.input.split("\\n").join("\n")
                    : v.input;
                  const output =
                    typeof v.output === "string" && v.output.includes("\\n")
                      ? v.output.split("\\n").join("\n")
                      : v.output;
                  const result =
                    typeof v.result === "string" && v.result.includes("\\n")
                      ? v.result.split("\\n").join("\n")
                      : v.result;

                  return (
                    <table className="code-output" key={i}>
                      <tbody>
                        <tr>
                          <th>입력값</th>
                          <td style={{ whiteSpace: "pre-line" }}>
                            {input ?? "로딩중..."}
                          </td>
                        </tr>
                        <tr>
                          <th>기댓값</th>
                          <td style={{ whiteSpace: "pre-line" }}>
                            {output ?? "로딩중..."}
                          </td>
                        </tr>
                        <tr>
                          <th>출력</th>
                          <td style={{ whiteSpace: "pre-line" }}>
                            {result ?? "로딩중..."}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
              </>
            )}
          </div>

          <div className="submit">
            <button type="button" onClick={onClickCodeRun}>
              코드 실행
            </button>
            <button type="button" onClick={onSubmit}>
              제출하기
            </button>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef}>
        <div className="dialog-content">
          <div className="inner">
            <h4>{dialogText?.title}</h4>
            <p>{dialogText?.text}</p>
            <form method="dialog">
              <button>닫기</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Problem;
