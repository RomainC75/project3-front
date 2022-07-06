import React from "react";
import "./styles/Product.css";

const Product = ({ product }) => {
  const starsNumber = Math.round(parseFloat(product.globalRate));
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
      <picture className="picture">
        <img src={product.pictures[0]} alt={product.name} />
      </picture>

      <div className="description">
        <p className="reviews">

          Reviews :{" "}
          {array.map((x,i) =>
            x === "E" ? <div className="yellowStar" key={`${product._id}-${i}`}>★</div> : <div key={`${product._id}-${i}`}>☆</div>
          )}
        </p>
        {/* <p className='reviews'>Reviews : {array.map(x=>x==='E' ? <FontAwesomeIcon icon={faStar}/> : <div>☆</div>)}</p> */}


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
