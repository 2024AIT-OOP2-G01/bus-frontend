import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import useLocation from "./hooks/useLocation";
import "./App.css";
import Title from "./Title";
import Just_Bus from "./Just_Bus";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Title />
      <Just_Bus thisbus="ちょうどいいバス…"/>
      <Just_Bus thisbus="次にちょうどいいバス…"/>
    </>
  );
}

export default App;
