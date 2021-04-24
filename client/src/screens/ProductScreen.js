import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux/actions/productActions";
import Rating from "../components/Rating";
import "../styles/screens/productScreen/productScreen.css";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  let price = "";
  let stock = "";
  if (!error) {
    price = String(product.price).split(".");
    stock = { text: "In stock", color: "green" };
    if (product.countInStock === 0) {
      stock = { text: "Out of Stock", color: "red" };
    }
  }

  return (
    <div className="productScreen">
      {loading ? (
        <h3 className="productScreen__loading">Loading...</h3>
      ) : error ? (
        <h3 className="productScreen__error">{error}</h3>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ProductScreen;
