import React, { useContext, useEffect, useState } from "react";
import "./CartItem.scss";
import icon from "../../images/icon-trash.png";
import { CartContext } from "../../context";

const CartItem = ({
  cartProduct,
  calculateTotalPrice,
  setTotalPrice,
  calculateTotalCount,
  setTotalCount,
}) => {
  const { cart, setCart } = useContext(CartContext);
  const [counter, setCounter] = useState(cartProduct.count);

  const updateCartList = (index) => {
    console.log(cartProduct);
    if (cartProduct.count === 0) {
      return [...cart.slice(0, index), ...cart.slice(index + 1)];
    }

    if (index === -1) {
      return [...cart, cartProduct];
    }

    return [...cart.slice(0, index), cartProduct, ...cart.slice(index + 1)];
  };

  const updateCartProductCount = (newCount) => {
    const cartItemIndex = cart.findIndex((item) => item.id === cartProduct.id);
    cartProduct.count = newCount;

    const newArray = updateCartList(cartItemIndex);
    setCart(newArray);
  };

  const updateCartProductTotalPrice = (newCount) => {
    const cartItemIndex = cart.findIndex((item) => item.id === cartProduct.id);
    cartProduct.totalPrice = cartProduct.price.raw * newCount;

    const newArray = updateCartList(cartItemIndex);
    setCart(newArray);
  };

  const handleInputChange = (e) => {
    const newCount = parseInt(e.target.value);

    if (e.target.value === "") {
      setCounter("");
    }

    if (!isNaN(newCount)) {
      setCounter(newCount);
      updateCartProductCount(newCount);
      updateCartProductTotalPrice(newCount);
    }
  };

  const updateCartProductQty = (quantity) => {
    const cartItemIndex = cart.findIndex((item) => item.id === cartProduct.id);
    setCounter(quantity);
    cartProduct.count = quantity;
    cartProduct.totalPrice = cartProduct.price.raw * quantity;
    const newArray = updateCartList(cartItemIndex);
    setCart(newArray);

    if (quantity === 0) {
      localStorage.removeItem("cart");
    }
  };

  const removeCartProduct = () => {
    const cartItemIndex = cart.findIndex((item) => item.id === cartProduct.id);

    cartProduct.count = 0;

    const newArray = updateCartList(cartItemIndex);

    setCart(newArray);

    if (newArray.length === 0) {
      localStorage.removeItem("cart");
    }
  };

  useEffect(() => {
    setTotalCount(calculateTotalCount());
    setTotalPrice(calculateTotalPrice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="cart__item">
      <img className="cart__item-img" src={cartProduct.image.url} alt="" />
      <div className="cart__item-wrapper">
        <div className="cart__item-wrapper-top">
          <h1>{cartProduct.name}</h1>
          <button
            className="cart__item-remove-button"
            onClick={removeCartProduct}
          >
            <img className="cart__item-icon-trash" src={icon} alt="" />
          </button>
        </div>
        <div className="cart__item-wrapper-bottom">
          <div className="cart__item-counter-buttons">
            <button
              className="cart__item-counter-button"
              onClick={() => updateCartProductQty(cartProduct.count - 1)}
            >
              -
            </button>
            <input
              className="cart__item-counter-input"
              value={counter}
              onChange={handleInputChange}
            />
            <button
              className="cart__item-counter-button"
              onClick={() => updateCartProductQty(cartProduct.count + 1)}
            >
              +
            </button>
          </div>
          <span className="cart__item-price">
            {cartProduct.price.raw} {"₽"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
