import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/cart.context";
import './styles/CartPage.css'
const API_URL = "http://localhost:5005";


export default function Cart() {
  const { cartState, patchCartAndUpdateStateLS } = useContext(CartContext);

  //version populated
  const [downloadedCart, setDownloadedCart] = useState([]);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if('_id' in cartState){
      axios.get(`${API_URL}/cart/${cartState._id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        setDownloadedCart(res.data[0].products);
      })
      .catch((e) => console.log(e));
    }
  }, [cartState])

  //modify the downloadedVersion
  const removeItemInDownloadedCart = (productId) =>{
    let tempDownloadCart = [...downloadedCart]
    tempDownloadCart = tempDownloadCart.filter(prod=>prod.productId._id!==productId)
    setDownloadedCart(tempDownloadCart)
  }

  const updateThroughDownloadedCart = () =>{
    const cartId = cartState._id
    const storedToken = localStorage.getItem('authToken')
    const filteredCart = downloadedCart.map(prod=>{return {
      quantity:prod.quantity,
      productId:prod.productId._id,
      _id:prod._id
    }})
    patchCartAndUpdateStateLS(filteredCart, cartId, storedToken)
  }

  return (
    <div>
      <button onClick={updateThroughDownloadedCart}>Apply!</button>
      <ul>
      {downloadedCart && downloadedCart.length>0 && downloadedCart.map((product, i) => {
        return (
          <Link to={`/product/${product._id}`}>
            <li key={`cart-${product._id}-${i}`}>
              <h3>{product.productId.name}</h3>
              <img src={product.productId.pictures[0]} alt={`${product.productId.name} ${i}`}/>
              <p>Quantity : <span>{product.quantity}</span></p>
              <div className="toRemove" onClick={()=>removeItemInDownloadedCart(product.productId._id)}>Remove</div>
            </li>
          </Link>);
      })}
      </ul>
    </div>
  );
}
