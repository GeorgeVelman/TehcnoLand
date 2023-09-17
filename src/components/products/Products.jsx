import React, { useContext } from "react";
import ProductCard from "./product/ProductCard";
import "./products.scss";
import Loader from "../UI/loader/Loader";
import { HomeContext, SearchContext } from "../../context";

const Products = () => {
  const { searchValue } = useContext(SearchContext);
  const { products, productError, isProductLoading } = useContext(HomeContext);
  return (
    <>
      {productError && (
        <div className="wrapper">
          <h1 className="error-message">
            Произошла ошибка: {productError} (не забудьте включить VPN)
          </h1>
        </div>
      )}
      {isProductLoading ? (
        <div className="wrapper">
          <Loader />
        </div>
      ) : (
        <div className="products">
          {products
            .filter((product) => {
              return product.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Products;
