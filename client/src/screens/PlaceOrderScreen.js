import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const showDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  cart.itemsPrice = showDecimals(
    cartItems.reduce((total, product) => total + product.price * product.qty, 0)
  );
  cart.shippingPrice = showDecimals(cart.itemsPrice > 100 ? 0 : 30);
  cart.taxPrice = showDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const createdOrder = useSelector((state) => state.createdOrder);
  const { order, success, error } = createdOrder;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  });

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="placeorder">
      <div className="placeorder__left">
        <div className="placeorder__left--info">
          <div className="infoItems">
            <h2 className="infoItems__name">Address</h2>
            <div className="infoItems__info">
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </div>
          </div>
          <div className="infoItems">
            <h3 className="infoItems__name">Payment Method</h3>
            <div className="infoItems__info">{paymentMethod}</div>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <h3 className="placeorder__left--empty">Your cart is empty</h3>
        ) : (
          <div className="placeorder__left--items">
            {cartItems.map((item, index) => (
              <div key={index} className="item">
                <img className="item__image" src={item.image} alt={item.name} />
                <Link className="item__name" to={`/product/${item.productId}`}>
                  {item.name}
                </Link>
                <div className="item__price">
                  {item.qty} x ${item.price} = $
                  {(item.qty * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="placeorder__right">
        <h2 className="placeorder__right--title">Order Summary</h2>
        <div className="placeorder__right--summary">
          <div>Items: ${cart.itemsPrice}</div>
          <div>Shipping: ${cart.shippingPrice}</div>
          <div>Tax: ${cart.taxPrice}</div>
          <div>Total: ${cart.totalPrice}</div>
        </div>
        {error && <h3 className="placeorder__right--error">{error}</h3>}
        <button
          className="placeorder__right--submit"
          disabled={cartItems.length === 0}
          onClick={placeOrderHandler}
        >
          Place your order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
