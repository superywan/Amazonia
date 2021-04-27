import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/userActions";
import "../styles/screens/loginScreen/loginScreen.css";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(login(email, password));
  };

  return (
    <div className="login">
      <h1 className="login__title">Sign-In</h1>
      {error && <h3 className="login__error">{error}</h3>}
      {loading && <h3 className="login__loading">Loading...</h3>}
      <form className="login__form" onSubmit={submitHandler}>
        <label className="login__form--label" htmlFor="email">
          Email
        </label>
        <input
          className="login__form--input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="login__form--label" htmlFor="password">
          Password
        </label>
        <input
          className="login__form--input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__form--submit" type="submit">
          Sign-In
        </button>
        <div className="login__register">
          New to Amazon?
          <Link
            className="login__register--link"
            to={redirect ? `/register?redirect=${redirect}` : "register"}
          >
            Create your Amazon account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
