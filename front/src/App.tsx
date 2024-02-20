import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function App() {
  const [value, setValue] = useState("console.log('Hello World!')");

  const onSubmit = useCallback(async () => {
    await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/todo`, {
      data: value,
    });
  }, [value]);

  const onChange = useCallback((code: string) => {
    // console.log(code);
    setValue(code);
  }, []);

  return (
    <div className="App">
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={[javascript({ jsx: true })]}
        height="200px"
      />
      <button onClick={onSubmit}>제출하기</button>
    </div>
  );
}

export default App;
