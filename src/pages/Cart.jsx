import React, { useContext, useEffect, useState } from "react";
import "../styles/cart-page.scss";
import CartItem from "../components/cart/CartItem";
import { CartContext } from "../context";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice());
  const [totalCount, setTotalCount] = useState(calculateTotalCount());

  function calculateTotalPrice() {
    return cart.reduce((accum, product) => {
      return accum + product.totalPrice;
    }, 0);
  }

  function calculateTotalCount() {
    return cart.reduce((accum, product) => {
      return accum + product.count;
    }, 0);
  }

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <main className="cart">
      <div className="background-container">
        <div className="container">
          {cart.length ? (
            <>
              <div className="cart__title-wrapper">
                <h1 className="cart__title">Корзина</h1>
                <div className="cart__products-count">
                  Количество товаров: {totalCount}
                </div>
              </div>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  cartProduct={item}
                  calculateTotalPrice={calculateTotalPrice}
                  setTotalPrice={setTotalPrice}
                  calculateTotalCount={calculateTotalCount}
                  setTotalCount={setTotalCount}
                />
              ))}
              <div>{totalPrice}</div>
            </>
          ) : (
            <h1>Корзина пуста</h1>
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
