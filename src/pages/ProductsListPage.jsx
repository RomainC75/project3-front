import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FilterContext } from "../context/productListAndFilter.context"
import Product from "../components/Product";
import ProductListFilter from "../components/ProductListFilter";
import {Link} from 'react-router-dom'
import './styles/ProductsListPage.css'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

export default function ProductListPage() {
  const {productsList, setProductsList, minPriceSelected,maxPriceSelected,ratingSelected,categorySelected, isProductLoaded, setIsProductLoaded} = useContext(FilterContext)
  // const [productsList, setProductsList] = useState([]);
  const [isLoadingProd, setIsLoadingProd] = useState(false);
  //const [isProductLoaded, setIsProductLoaded] = useState(false);
  // console.log('maxPriceSelected ! ',maxPriceSelected)
  console.log('API_URL',API_URL)
  useEffect(() => {
    setIsLoadingProd(true);
    axios
      .get(`${API_URL}/product`)
      .then((ans) => {
        setProductsList(ans.data);
        //console.log(ans.data);
        setIsLoadingProd(false);
        setIsProductLoaded(true);
        //console.log(ans.data.find(product=>product.name==="Fender 63 Tele Custom AOW Relic MBDW"))
      })
      .catch((e) => {
        setIsLoadingProd(false);
        console.log(e);
      });
  }, []);

  return (
    <div className="Instruments">
      <h2>Instruments</h2>
      
      <div className="filterAndList">
        <ProductListFilter/>
        {isLoadingProd && <div className="progress"></div>}
        <ul className='list'>
          {isProductLoaded &&
            productsList.filter((product)=>{
              const ratingCeil = Math.ceil(product.globalRate)
              //console.log(product.globalRate, ratingCeil)
              return product.price<maxPriceSelected && product.price>=minPriceSelected && ratingSelected[ratingCeil] && (categorySelected==='All' || product.type===categorySelected)
            }).map((product) => {
              return <Link key={product._id} to={`/product/${product._id}`}><Product product={product} /></Link>
            })}
        </ul>
      </div>
    </div>
  );
}
