import React, { useEffect, useState } from "react";
import { getTest } from "./api/test";

import "./App.css";

function App() {
  const [text, setText] = useState(null);
  useEffect(() => {
    getTest().then((res) => {
      setText(res.payload.text);
    });
  }, []);
  return (
    <div className="App">
      <h1>{text === null ? "Loading..." : text}</h1>
    </div>
  );
}

export default App;
