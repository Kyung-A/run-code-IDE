import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { requestProblemList } from "../apis/problemApi";
import { IProblemList } from "./../types/index";

const ProblemList = () => {
  const [data, setDate] = useState<IProblemList[]>();

  useEffect(() => {
    requestProblemList().then((rep) => setDate(rep.data));
  }, []);

  return (
    <div>
      <ul>
        {data?.map((v) => (
          <li key={v.id}>
            <Link to={`/problemList/${v.id}`}>{v.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
