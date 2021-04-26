import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import "../styles/screens/cartScreen/cartScreen.css";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <div className="cart__empty">
          <h1 className="cart__empty--title">Your Amazon Cart is empty.</h1>
          <Link className="cart__empty--link" to="/">
            Go Back
          </Link>
        </div>
      ) : (
        <>
          <h1 className="title">Shopping Cart</h1>
          <div className="cart__left">
            <div className="cart__left--products">
              {cartItems.map((product) => (
                <div key={product.productId} className="product">
                  <img
                    className="product__image"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="product__content">
                    <h3 className="product__content--name">
                      <Link to={`/product/${product.productId}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <div className="product__content--price">
                      ${product.price}
                    </div>
                    <select
                      className="product__content--qty"
                      value={product.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(product.productId, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      className="product__content--remove"
                      onClick={() => removeItemHandler(product.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart__right">
            <h2 className="cart__right--subtotal">
              Subtotal (
              {cartItems.reduce((acc, currentItem) => acc + currentItem.qty, 0)}
              )
            </h2>
            <h3 className="cart__right--totalPrice">
              $
              {cartItems
                .reduce(
                  (acc, currentItem) =>
                    acc + currentItem.price * currentItem.qty,
                  0
                )
                .toFixed(2)}
            </h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;
