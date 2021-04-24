import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import "../styles/screens/homeScreen/homeScreen.css";

import { listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home__title">Latest arrivals from All</div>
      {loading ? (
        <h3 className="home__loading">Loading...</h3>
      ) : error ? (
        <h3 className="home__error">{error}</h3>
      ) : (
        <div className="home__products">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
