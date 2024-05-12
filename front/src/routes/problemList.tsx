import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { requestProblemList } from "../apis/problemApi";
import { IProblemList } from "../types";

function ProblemList() {
  const [data, setDate] = useState<IProblemList[]>();

  useEffect(() => {
    requestProblemList().then((rep) => setDate(rep.data));
  }, []);

  return (
    <div className="App">
      <div className="problem-list-wrapper">
        <div className="wapper-inner">
          <h1>문제 목록</h1>
          <div className="problem-list">
            <ul>
              {data?.map((v) => (
                <li key={v.id}>
                  <Link to={`${v.id}`}>{v.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemList;
