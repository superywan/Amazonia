import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/actions/cartActions";
import "../styles/screens/shippingScreen/shippingScreen.css";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <div className="shipping">
      <h1 className="shipping__title">Shipping</h1>
      <form className="shipping__form" onSubmit={submitHandler}>
        <label className="shipping__form--label" htmlFor="address">
          Address
        </label>
        <input
          className="shipping__form--input"
          type="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label className="shipping__form--label" htmlFor="city">
          City
        </label>
        <input
          className="shipping__form--input"
          type="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label className="shipping__form--label" htmlFor="postalCode">
          Postal Code
        </label>
        <input
          className="shipping__form--input"
          type="postalCode"
          name="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <label className="shipping__form--label" htmlFor="country">
          Country
        </label>
        <input
          className="shipping__form--input"
          type="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <button className="shipping__form--submit" type="submit">
          Use this address
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
