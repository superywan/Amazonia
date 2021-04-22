import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "../components/Product";
import "../style/homeScreen.css";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

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
