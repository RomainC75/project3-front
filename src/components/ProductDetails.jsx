import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import Carousel from "./Carousel";

import "./styles/ProductDetails.css";

export default function ProductDetails({ product, isLoaded }) {
  return (
    <div className="ProductDetails">
      <div className="leftSideDetails">
        <h2>{product.name}</h2>
        <div><span class="detail">Brand: </span> {product.brand}</div>
        <div><span class="detail">Type: </span> {product.type}</div>
        <div><span class="detail">Price: </span> {product.price}€</div>
        <div>
        <span class="detail">Disponibitily: </span>
          <span style={{ color: product.stockQuantity > 0 ? "green" : "red" }}>
            inStock
          </span>
          {product.stockQuantity > 0 ? (
            <FontAwesomeIcon className="inStockChecked" icon={faCheck} />
          ) : (
            <FontAwesomeIcon className="inStockUnchecked" icon={faXmark} />
          )}
        </div>
      </div>

      <Carousel images={isLoaded ? product.pictures : []} />
    </div>
  );
}
