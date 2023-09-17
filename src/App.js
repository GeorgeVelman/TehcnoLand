import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AppRouter from "./components/AppRouter";
import "./styles/common.css";
import { HomeContext, CartContext, SearchContext } from "./context";
import { useFetching } from "./hooks/UseFetching";
import ProductService from "../API/ProductService";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [getProducts, isProductLoading, productError] = useFetching(
    async () => {
      const response = await ProductService.fetchProducts();
      setProducts(response);
    }
  );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <HomeContext.Provider
        value={{ products, productError, isProductLoading }}
      >
        <CartContext.Provider value={{ cart, setCart }}>
          <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Header />
            <AppRouter />
            <Footer />
          </SearchContext.Provider>
        </CartContext.Provider>
      </HomeContext.Provider>
    </div>
  );
}

export default App;
