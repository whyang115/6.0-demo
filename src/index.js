import React from "react";
import ReactDOM from "react-dom";
import Container from "./container";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Container />
  </React.StrictMode>,
  rootElement
);
