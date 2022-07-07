import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/productListAndFilter.context";
import Product from "../components/Product";
import ProductListFilter from "../components/ProductListFilter";
import "./styles/ProductsListPage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function ProductListPage() {
  const {
    productsList,
    setProductsList,
    minPriceSelected,
    maxPriceSelected,
    ratingSelected,
    categorySelected,
    isProductLoaded,
    setIsProductLoaded,
  } = useContext(FilterContext);
  const [isLoadingProd, setIsLoadingProd] = useState(false);

  console.log('API_URL',API_URL)
  useEffect(() => {
    setIsLoadingProd(true);
    axios
      .get(`${API_URL}/product`)
      .then((ans) => {
        setProductsList(ans.data);
        setIsLoadingProd(false);
        setIsProductLoaded(true);
      })
      .catch((e) => {
        setIsLoadingProd(false);
      });
  }, []);

  return (
    <div className="Instruments">
      <h2>Instruments</h2>
      <div className="filterAndList">
        <ProductListFilter />
        {isLoadingProd && <div className="progress"></div>}
        <ul className="list">
          {isProductLoaded &&
            productsList
              .filter((product) => {
                const ratingCeil = Math.ceil(product.globalRate);
                return (
                  product.price < maxPriceSelected &&
                  product.price >= minPriceSelected &&
                  ratingSelected[ratingCeil] &&
                  (categorySelected === "All" ||
                    product.type === categorySelected)
                );
              })
              .map((product) => {
                return (
                    <Product product={product} />
                );
              })}
        </ul>
      </div>
    </div>
  );
}
