import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

import { CartContext } from "../context/cart.context";
import { AuthContext } from "../context/auth.context";
import './styles/CartPage.css'
const API_URL = "http://localhost:5005";


export default function Cart() {
  const { cartState, patchCartAndUpdateStateLS } = useContext(CartContext);

  //version populated
  const [downloadedCart, setDownloadedCart] = useState([]);
  
  useEffect(() => {
    console.log("cartState : ", cartState);
    const storedToken = localStorage.getItem("authToken");
    if('_id' in cartState){
      console.log('inside :')
      axios.get(`${API_URL}/cart/${cartState._id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        console.log('res.data : ',res.data)
        setDownloadedCart(res.data[0].products);
      })
      .catch((e) => console.log(e));
    }
  }, [cartState])

  //modify the downloadedVersion
  const removeItemInDownloadedCart = (productId) =>{
    let tempDownloadCart = [...downloadedCart]
    console.log('targeted productId', productId)
    console.log(tempDownloadCart)
    tempDownloadCart = tempDownloadCart.filter(prod=>prod.productId._id!==productId)
    console.log('newDownloadedCart = ',tempDownloadCart)
    setDownloadedCart(tempDownloadCart)
  }

  const updateThroughDownloadedCart = () =>{
    console.log('LIST TO UPDATE : ', downloadedCart)
    console.log('cartState : ',cartState)
    const cartId = cartState._id
    const storedToken = localStorage.getItem('authToken')
    const filteredCart = downloadedCart.map(prod=>{return {
      quantity:prod.quantity,
      productId:prod.productId._id,
      _id:prod._id
    }})
    console.log('filteredCart',filteredCart)
    console.log('function : ',patchCartAndUpdateStateLS,cartState)
    patchCartAndUpdateStateLS(filteredCart, cartId, storedToken)
  }

  return (
    <div>
      <button onClick={updateThroughDownloadedCart}>Apply!</button>
      <ul>
      {downloadedCart && downloadedCart.length>0 && downloadedCart.map((product, i) => {
        console.log('product',product)
        return (
          <li key={`cart-${product._id}-${i}`}>
            <h3>{product.productId.name}</h3>
            <img src={product.productId.pictures[0]} alt={`${product.productId.name} image`}/>
            <div className="toRemove" onClick={()=>removeItemInDownloadedCart(product.productId._id)}>Remove</div>
          </li>);
      })}
      </ul>
    </div>
  );
}
