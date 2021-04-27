import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userActions";
import "../styles/screens/registerScreen/registerScreen.css";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords must match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="register">
      <h1 className="register__title">Create account</h1>
      {error && <h3 className="register__error">{error}</h3>}
      {loading && <h3 className="register__loading">Loading...</h3>}
      <form className="register__form" onSubmit={submitHandler}>
        <label className="register__form--label" htmlFor="name">
          Your name
        </label>
        <input
          className="register__form--input"
          type="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="register__form--label" htmlFor="email">
          Email
        </label>
        <input
          className="register__form--input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="register__form--label" htmlFor="password">
          Password
        </label>
        <input
          className="register__form--input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={message ? { border: "2px solid red" } : {}}
        />
        <label className="register__form--label" htmlFor="confirmPassword">
          Re-enter password
        </label>
        <input
          className="register__form--input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={message ? { border: "2px solid red", marginBottom: "0" } : {}}
        />
        {message && <div className="register__message">{message}</div>}
        <button className="register__form--submit" type="submit">
          Create your Amazon account
        </button>
      </form>
      <div className="register__login">
        Already have an account?{" "}
        <Link
          className="register__login--link"
          to={redirect ? `/login?redirect=${redirect}` : "login"}
        >
          Sign-In
        </Link>
      </div>
    </div>
  );
};

export default RegisterScreen;
