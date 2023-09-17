import React, { useContext } from "react";
import { stripHtml } from "string-strip-html";
import "./productCard.scss";
import cartImg from "@images/test.png";
import { CartContext, HomeContext } from "../../../context";

const ProductCard = ({ product }) => {
  const { products } = useContext(HomeContext);
  const { cart, setCart } = useContext(CartContext);
  const { result } = stripHtml(product.description);

  const updateCartList = (newProduct, index) => {
    if (index === -1) {
      return [...cart, newProduct];
    }

    return [...cart.slice(0, index), newProduct, ...cart.slice(index + 1)];
  };

  const updateProduct = (productInCart, getProduct = null) => {
    if (productInCart) {
      return {
        ...productInCart,
        totalPrice: productInCart.totalPrice + productInCart.price.raw,
        count: productInCart.count + 1,
      };
    }

    return {
      ...getProduct,
      totalPrice: getProduct.price.raw,
      count: 1,
    };
  };

  const addProuctInCart = (id) => {
    const getProduct = products.find((product) => product.id === id);
    const getProductCartIndex = cart.findIndex((product) => product.id === id);
    const productInCart = cart[getProductCartIndex];

    const newProductCart = updateProduct(productInCart, getProduct);
    const newArray = updateCartList(newProductCart, getProductCartIndex);

    setCart(newArray);
    localStorage.setItem("cart", JSON.stringify(newArray));
  };

  return (
    <div className="product-card">
      <img
        className="product-card__image"
        src={product.image?.url}
        alt={product.name}
      />
      <h4 className="product-card__name">{product.name}</h4>
      <p className="product-card__description">{result}</p>
      <div className="product-card__details">
        <p className="product-card__price">
          {product.price.raw} {"₽"}
        </p>
        <button
          className="product-card__cart-btn"
          onClick={() => addProuctInCart(product.id)}
        >
          <img className="product-card__cart-img" src={cartImg} alt="cart" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
