import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import "./styles/Product.css";

const Product = ({ product }) => {
  const starsNumber = Math.round(parseFloat(product.globalRate));
  const star = "";
  const array = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= starsNumber) {
      array.push("E");
    } else {
      array.push("X");
    }
  }

  return (
    <li className="product">
      <picture className="picture">
        <img src={product.pictures[0]} alt={product.name} />
      </picture>

      <div className="description">
        <p className="reviews">
          Reviews ({product.reviewsQty}) :
        <p className="reviewsRating">
        {array.map((x) =>
            x === "E" ? (
              <FontAwesomeIcon className="yellowStar" icon={solidStar} />
            ) : (
              <FontAwesomeIcon className="" icon={faStar} />
            )
          )}
        </p>
        </p> 

        <h3>{product.name}</h3>

        <p className="price">{product.price} €</p>
        <p className="stockQuantity">
          {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </li>
  );
};

export default Product;
