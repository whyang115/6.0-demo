import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const a = [1, 2, 3];
  const initArr = a.map(i => i + 1);
  const [arr, setArr] = useState(initArr);
  console.log(arr);
  return (
    <div className="App" onClick={() => setArr(arr.concat([3]))}>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
