import logo from "./logo.svg";
import "./App.css";

function App() {
  let count = 0;
  function incrementCount() {
    count += 1;
    console.log(count);
  }
  function decrementCount() {
    count -= 1;
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
