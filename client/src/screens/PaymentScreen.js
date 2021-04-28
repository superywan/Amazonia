import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className="payment">
      <h1 className="payment__title">Payment Method</h1>
      <form className="payment__form" onSubmit={submitHandler}>
        <label className="payment__form--label" htmlFor="paypal">
          Paypal
        </label>
        <input
          className="payment__form--input"
          type="radio"
          name="payment"
          value="Paypal"
          onChange={(e) => setPaymentMethod(e.target.value)}
          checked
        />
        {/* <input
          className="payment__form--input"
          type="radio"
          name="payment"
          value="Stripe"
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        /> */}
        <button className="payment__form--submit" type="submit">
          Use this payment Method
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
