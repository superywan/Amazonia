import React from "react";
import Rating from "../components/Rating";
import "../style/productScreen.css";
import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((item) => item._id === match.params.id);
  const price = String(product.price).split(".");
  let stock = { text: "In stock", color: "green" };
  if (product.countInStock === 0) {
    stock = { text: "Out of Stock", color: "red" };
  }

  return (
    <div className="productScreen">
      <div className="productScreen-left">
        <img
          className="productScreen__left--image"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="productScreen__right">
        <div className="productScreen__right--title">{product.name}</div>
        <Rating
          value={product.rating}
          text={` ${product.numReviews} reviews`}
        />
        <div className="productScreen__right--description">
          {product.description}
        </div>
        <div className="productScreen__right--price">
          ${price[0]}
          <sup>{price[1]}</sup>
        </div>
        <div
          className="productScreen__right--status"
          style={{ color: stock.color }}
        >
          {stock.text}
        </div>
        <button
          className="productScreen__right--cart"
          disabled={product.countInStock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductScreen;
