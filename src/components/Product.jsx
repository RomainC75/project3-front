import React from "react";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import "./styles/Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCheck } from "@fortawesome/free-solid-svg-icons";




const Product = ({ product }) => {

  const starsNumber = Math.ceil(parseFloat(product.globalRate));
  console.log(product)
  const array = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= starsNumber) {
      array.push("E");
    } else {
      array.push("X");
    }
  }

  if (product.stockQuantity > 0) {
    document.getElementsByClassName("stockQuantity").textContent = "In Stock";
  } else {
    document.getElementsByClassName("stockQuantity").textContent =
      "Out of Stock";
  }

  return (
    <li className="product">
      <Link key={product._id} to={`/product/${product._id}`}>
      <picture className="picture">
        <img src={product.pictures[0]} alt={product.name} />
      </picture>
      </Link>
      <div className="description">
        <p className="reviews">

          Reviews :{" "}
          {array.map((x,i) =>
            x === "E" ? <div className="yellowStar" key={`${product._id}-${i}`}>★</div> : <div key={`${product._id}-${i}`}>☆</div>
          )}
          ({product.reviewsQty})
        </p>
        <h3>{product.name}</h3>
        <p className="price">{product.price} €</p>
        
        {product.stockQuantity>0 ? 
          <p className="stockQuantity gree"><FontAwesomeIcon className="carouselCommand" icon={faCheck}/>In Stock !</p>
        :
        <p className="stockQuantity red"><FontAwesomeIcon className="carouselCommand" icon={faCircleXmark}/>In Stock !</p>
        }
        <AddToCart product={product}/>
      </div>
    </li>
  );
};

export default Product;
