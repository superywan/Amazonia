import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { getOrderDetails, payOrder } from "../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../redux/constants/orderConstants";
import "../styles/screens/orderScreen/orderScreen.css";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingOrderPay, success: successOrderPay } = orderPay;

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
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      console.log(clientId);
      const paypalSDKscript = document.createElement("script");
      paypalSDKscript.type = "text/javascript";
      paypalSDKscript.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      paypalSDKscript.async = true;
      paypalSDKscript.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(paypalSDKscript);
    };

    if (!order || successOrderPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successOrderPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

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
              <div className="success">
                Order delivered on {order.deliveredAt}
              </div>
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
            <div className="success">Order paid on {order.paidAt}</div>
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
          {!order.isPaid && (
            <div className="order__content--right--payment">
              {loadingOrderPay && (
                <h3 className="order__loading">Loading...</h3>
              )}
              {!sdkReady ? (
                <h3 className="order__loading">Loading...</h3>
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
