import React from "react";
import { Link } from "react-router-dom";
import companyLogo from "../images/amazon_logo.png";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <Link to="/">
          <img className="footer__image" src={companyLogo} alt="company logo" />
        </Link>
        <p className="footer__copyright">Developed By Eddy Yi &copy;2021</p>
      </div>
    </footer>
  );
};

export default Footer;
