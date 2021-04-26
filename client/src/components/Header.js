import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions.js";
import companyLogo from "../images/amazon_logo.png";
import "../styles/components/header/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    alert("Successfully Logged Out");
  };
  return (
    <header>
      <nav className="header">
        <Link to="/">
          <div className="header__left">
            <img
              className="header__left--image"
              src={companyLogo}
              alt="company logo"
            ></img>
          </div>
        </Link>
        <div className="header__right">
          {userInfo ? (
            <div className="header__right--dropdown">
              <button className="dropdown__button">{userInfo.name}</button>
              <ul className="dropdown__content">
                <li className="dropdown__content--item">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="dropdown__content--item" onClick={logoutHandler}>
                  Logout
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <div className="header__right--signIn">Sign In</div>
            </Link>
          )}
          <Link to="/cart">
            <div className="header__right--cart">Cart</div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
