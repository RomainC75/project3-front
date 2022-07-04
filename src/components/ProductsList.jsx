import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "./Product";

import './styles/ProductsList.css'

const API_URL = "http://localhost:5005";



export default function Instruments() {
  const [productsList, setProductsList] = useState([]);
  const [isLoadingProd, setIsLoadingProd] = useState(false);
  const [isLoadedProd, setIsLoadedProd] = useState(false);
  useEffect(() => {
    setIsLoadingProd(true);
    axios
      .get(`${API_URL}/product`)
      .then((ans) => {
        setProductsList(ans.data);
        console.log(ans.data);
        setIsLoadingProd(false);
        setIsLoadedProd(true);
      })
      .catch((e) => {
        setIsLoadingProd(false);
        console.log(e);
      });
  }, []);
  return (
    <div className="Instruments">
      <div>Instrument</div>
      <ul>
        {isLoadedProd &&
          productsList.map((product) => {
            return <Product product={product} />
          })}
      </ul>
    </div>
  );
}
