import React, { useContext } from "react";
import cl from "./SearchInput.module.scss";
import { SearchContext } from "../../../context";

const SearchInput = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <input
      className={cl.search}
      type="text"
      placeholder="Поиск"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
    />
  );
};

export default SearchInput;
