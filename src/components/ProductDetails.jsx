import React, { useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import Carousel from './Carousel';


import './styles/ProductDetails.css'

export default function ProductDetails({product, isLoaded}) {
    console.log('product : ',product)


  return (
    <div className="ProductDetails">
        <h2>{product.name}</h2>
        <div>Brand: {product.brand}</div>
        <div>Type: {product.type}</div>
        <div>Price: {product.price}€</div>

        <div>Disponibitity: <span style={{color:product.stockQuantity>0?'green':'red'}}>inStock</span>{product.stockQuantity>0 ? 
            <FontAwesomeIcon className="inStockChecked" icon={faCheck} />
            :
            <FontAwesomeIcon className="inStockUnchecked" icon={faXmark} />
        }</div>
        <Carousel images={isLoaded ? product.pictures : []}/>
    </div>
  )
}
