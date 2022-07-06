import React, { useState, useContext } from "react";

import { CartContext } from "../context/cart.context";

export default function AddToCart({ product }) {
  const { updateServerCart } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const handleQty = (e) => {
    if (e.target.value < 10) {
      setQty(e.target.value);
    }
  };

  const addToCartFn = (e) => {

    console.log('PRODUCT : ',product)
    //------------------------------------
    updateServerCart({
      productId: product._id,
      quantity: parseInt(qty),
    });
  };
  return (
    <div className="AddToCart">
      <input type="number" min="0" value={qty} onChange={handleQty} />
      <button onClick={addToCartFn}>Add To Cart !</button>
    </div>
  );
}
