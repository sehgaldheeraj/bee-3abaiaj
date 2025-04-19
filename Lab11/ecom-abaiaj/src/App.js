//import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let products = []; //take it as a state array
  const [count, setCount] = useState(0);
  const [incrementor, setIncrementor] = useState(0);
  // setCount(updatedValue){
  //   const count = updatedValue;//

  // };
  async function fetchProducts() {
    try {
      let response = await fetch("http://localhost:4000/v1/products");
      const data = await response.json();
      console.log(data);
      products = data.products;
    } catch (err) {
      console.log(err.message);
    }
  }
  //every useEffect runs on mount (Whenever app component is called for the first time)
  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  // useEffect(() => {
  //   fetchProducts();
  // }, [products]);

  useEffect(() => {
    console.log("FROM MOUNT PHASE");
  }, []);

  useEffect(() => {
    console.log("FROM UPDATE PHASE");
  }, [count]);
  useEffect(() => {
    return () => {
      //all the necessary clean up tasks
      console.log("FROM UNMOUNT PHASE");
    };
  }, []);
  return (
    <div className="productsContainer">
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
      <h2>Your Products</h2>
      {products.map((product) => {
        return (
          <div>
            <h5>{product.name}</h5>
            <p>{product.desc}</p>
            <p>{product.price}</p>
            <p>{product.qty}</p>
            <p>{product.category}</p>
            <span>
              <a href="/v1/products/{ product.id }/edit">Update Product Data</a>
            </span>
            <span>
              <form
                method="POST"
                action="/v1/products/{ product.id }?_method=delete"
              >
                <button type="submit">Delete Product Data</button>
              </form>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
