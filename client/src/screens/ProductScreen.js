import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux/actions/productActions";
import Rating from "../components/Rating";
import { addToCart } from "../redux/actions/cartActions";
import "../styles/screens/productScreen/productScreen.css";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

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

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

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
            {product.countInStock > 0 && (
              <div className="productScreen__right--qty">
                Qty:
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              className="productScreen__right--cart"
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
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
