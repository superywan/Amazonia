import React from "react";
import { Link } from "react-router-dom";
import companyLogo from "../images/amazon_logo.png";
import "../styles/components/header/header.css";

const Header = () => {
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
          <Link to="/login">
            <div className="header__right--signIn">Sign In</div>
          </Link>
          <Link to="/cart">
            <div className="header__right--cart">Cart</div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
