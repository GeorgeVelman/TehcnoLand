import React from "react";
import icon from "@images/icon.png";
import cart from "@images/shopping-cart.png";
import "./header.scss";
import { Link } from "react-router-dom";
import SearchInput from "../UI/input/SearchInput";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link className="header__logo-link" to="/">
            <img className="header__logo-img" src={icon} alt="logo" />
            <p className="header__logo-text">TechnoLand</p>
          </Link>
          <SearchInput />
          <Link className="header__cart-link" to={"/cart"}>
            <img className="header__cart-img" src={cart} alt="cart" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
