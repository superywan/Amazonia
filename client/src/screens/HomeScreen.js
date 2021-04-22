import React from "react";
import products from "../products";
import Product from "../components/Product";
import "../style/homeScreen.css";

const HomeScreen = () => {
  return (
    <div className="home">
      <div className="home__title">Latest arrivals from All</div>
      <div className="home__products">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
