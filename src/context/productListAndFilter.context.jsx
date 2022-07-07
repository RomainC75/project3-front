import React, { useState, useEffect, createContext } from "react";

const FilterContext = createContext();

function FilterProviderWrapper({ children }) {
  const [productsList, setProductsList] = useState([]);
  const [isProductLoaded, setIsProductLoaded] = useState(false)
  const [minPriceSelected, setMinPriceSelected] = useState(0);
  const [maxPriceSelected, setMaxPriceSelected] = useState(3000);
  const [ratingSelected, setRatingSelected] = useState([true,true,true,true,true,true]);
  const [categorySelected, setCategorySelected] = useState("All");

  useEffect(()=>{
  },[productsList])

  useEffect(()=>{
  },[isProductLoaded])

  return (
    <FilterContext.Provider
      value={{
        productsList,
        setProductsList,
        minPriceSelected,
        setMinPriceSelected,
        maxPriceSelected,
        setMaxPriceSelected,
        ratingSelected,
        setRatingSelected,
        categorySelected,
        setCategorySelected,
        isProductLoaded, 
        setIsProductLoaded
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProviderWrapper };
