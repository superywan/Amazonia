import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import "../style/product.css";

const Product = ({ product }) => {
  const price = String(product.price).split(".");
  return (
    <div className="item">
      <Link to={`/product/${product._id}`}>
        <img className="item__image" src={product.image} alt={product.name} />
      </Link>
      <Link to={`/product/${product._id}`}>
        <div className="item__title">{product.name}</div>
      </Link>
      <Rating
        className="item__rating"
        value={product.rating}
        text={` ${product.numReviews} reviews`}
      />
      <div className="item__price">
        ${price[0]}
        <sup>{price[1]}</sup>
      </div>
    </div>
  );
};

export default Product;
