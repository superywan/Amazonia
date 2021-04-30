import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderActions";
import "../styles/screens/orderScreen/orderScreen.css";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  console.log(orderDetails);
  const { order, loading, error } = orderDetails;

  const showDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  if (!loading) {
    order.itemsPrice = showDecimals(
      order.orderItems.reduce(
        (total, product) => total + product.price * product.qty,
        0
      )
    );
  }

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  return loading ? (
    <h3 className="order__loading">Loading...</h3>
  ) : error ? (
    <h3 className="order__error">{error}</h3>
  ) : (
    <div className="order">
      <h1 className="order__title">Order ({order._id})</h1>
      <div className="order__content">
        <div className="order__content--left">
          <div className="infoItems">
            <h2 className="infoItems__name">SHIPPING</h2>
            <div className="infoItems__info">
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </div>
            {order.isDelivered ? (
              <div className="success">Order delivered!</div>
            ) : (
              <div className="fail">Not yet delivered</div>
            )}
            <hr />
          </div>

          <div className="infoItems">
            <h2 className="infoItems__name">PAYMENT METHOD</h2>
            <div className="infoItems__info">{order.paymentMethod}</div>
          </div>
          {order.isPaid ? (
            <div className="success">Order paid!</div>
          ) : (
            <div className="fail">Not yet paid</div>
          )}
          <hr />
          {order.orderItems.length === 0 ? (
            <h3 className="items__empty">Your cart is empty</h3>
          ) : (
            <div className="items">
              <h2 className="items__title">CART ITEMS</h2>
              {order.orderItems.map((item, index) => (
                <div key={index} className="item">
                  <img
                    className="item__image"
                    src={item.image}
                    alt={item.name}
                  />
                  <Link
                    className="item__name"
                    to={`/product/${item.productId}`}
                  >
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
        <div className="order__content--right">
          <h2 className="order__content--right--title">ORDER SUMMARY</h2>
          <div className="order__content--right--price">
            <strong>Items:</strong> ${showDecimals(order.itemsPrice)}
          </div>
          <div className="order__content--right--price">
            <strong>Shipping:</strong> ${showDecimals(order.shippingPrice)}
          </div>
          <div className="order__content--right--price">
            <strong>Tax:</strong> ${showDecimals(order.taxPrice)}
          </div>
          <div className="order__content--right--price">
            <strong>Total:</strong> ${showDecimals(order.totalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
