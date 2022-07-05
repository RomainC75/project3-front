import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/productListAndFilter.context";
import Product from "./Product";
import ProductListFilter from "./ProductListFilter";

import './styles/ProductsList.css'

const API_URL = "http://localhost:5005";

export default function Instruments() {
  const {productsList, setProductsList, minPrice,maxPrice,rating,category, isProductLoaded, setIsProductLoaded} = useContext(FilterContext)
  // const [productsList, setProductsList] = useState([]);
  const [isLoadingProd, setIsLoadingProd] = useState(false);
  //const [isProductLoaded, setIsProductLoaded] = useState(false);
  console.log('maxPrice ! ',maxPrice)

  useEffect(() => {
    setIsLoadingProd(true);
    axios
      .get(`${API_URL}/product`)
      .then((ans) => {
        setProductsList(ans.data);
        console.log(ans.data);
        setIsLoadingProd(false);
        setIsProductLoaded(true);
        console.log(ans.data.find(product=>product.name==="Fender 63 Tele Custom AOW Relic MBDW"))
      })
      .catch((e) => {
        setIsLoadingProd(false);
        console.log(e);
      });
  }, []);

  return (
    <div className="Instruments">
      <h2>Instrument</h2>
      
      <div className="filterAndList">
        <ProductListFilter/>
        {isLoadingProd && <div className="progress"></div>}
        <ul className='list'>
          {isProductLoaded &&
            productsList.filter((product)=>{
              const ratingCeil = Math.ceil(product.globalRate)
              console.log(product.globalRate, ratingCeil)
              return product.price<maxPrice && product.price>=minPrice && rating[ratingCeil] && (category==='All' || product.type===category)
            }).map((product) => {
              return <Product key={product._id} product={product} />
            })}
        </ul>
      </div>
    </div>
  );
}
