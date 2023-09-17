import React from "react";
import Products from "../components/products/Products";

const Home = () => {
  return (
    <main className="home">
      <div className="background-container">
        <div className="container">
          <Products />
        </div>
      </div>
    </main>
  );
};

export default Home;
