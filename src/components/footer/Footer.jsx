import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import icon from "@images/icon.png";
import iconInst from "@images/icon-inst.png";
import iconVk from "@images/icon-vk.png";
import iconYoutube from "@images/icon-youtube.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__contact">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo-img" src={icon} alt="logo" />
            <p className="footer__logo-text">TechnoLand</p>
          </Link>
          <div className="footer__social">
            <img className="footer__inst-img" src={iconInst} alt="logo" />
            <img className="footer__inst-img" src={iconVk} alt="logo" />
            <img className="footer__inst-img" src={iconYoutube} alt="logo" />
          </div>
        </div>
        © 2023 Компания TechnoLand. Администрация Сайта не несет ответственности
        за размещаемые Пользователями материалы (в т.ч. информацию и
        изображения), их содержание и качество.
      </div>
    </footer>
  );
};

export default Footer;
