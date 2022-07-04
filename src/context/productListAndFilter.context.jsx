import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";
const FilterContext = createContext();

function FilterProviderWrapper({ children }) {
  const [productsList, setProductsList] = useState([]);
  const [isProductLoaded, setIsProductLoaded] = useState(false)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [rating, setRating] = useState([true,true,true,true,true,true]);
  const [category, setCategory] = useState("");

  useEffect(()=>{
    console.log('product List : ', productsList)
  },[productsList])

  useEffect(()=>{
    console.log('is Product loaded : ', isProductLoaded)
  },[isProductLoaded])

  return (
    <FilterContext.Provider
      value={{
        productsList,
        setProductsList,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        rating,
        setRating,
        category,
        setCategory,
        isProductLoaded, 
        setIsProductLoaded
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export { FilterContext, FilterProviderWrapper };
