import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
function App() {
  //let count = 0;
  const [count, setCount] = useState(0); //state is immutable
  function incrementCount() {
    //count += 1;
    setCount(count + 1);
    console.log(count);
  }
  function decrementCount() {
    //count -= 1;
    setCount(count - 1);
    console.log(count);
  }
  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>+</button>
      <button onClick={decrementCount}>-</button>
    </div>
  );
}

export default App;
