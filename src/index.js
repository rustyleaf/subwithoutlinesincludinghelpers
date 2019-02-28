import React from "react";
import ReactDOM from "react-dom";
import TestExample from "./TestExample";

import "./styles.css";

function App() {
  return <TestExample />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
