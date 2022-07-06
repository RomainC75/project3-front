import React, { useState, useContext } from "react";

import { CartContext } from "../context/cart.context";

export default function AddToCart({ product }) {
  const { cartState, setCartState, updateServerCart } = useContext(CartContext);
  const [qty, setQty] = useState(0);
  const handleQty = (e) => {
    if (e.target.value < 10) {
      setQty(e.target.value);
    }
  };

  const addToCartFn = (e) => {
    //    const buff = {...cartState}
    //    console.log('buff: ',buff)
    //we are supposed to have every Carts in the sessionStorage
    //check if there is an Array of Carts
    //[{cart1},{cart2}]
    //    const findResult = buff.products.findIndex(prod=>prod._id===product._id)
    //    console.log(findResult)
    //    if(findResult===-1){
    //         buff.products.push({
    //             _id:product._id,
    //             quantity:parseInt(qty)
    //         })
    //    }else{
    //         buff.products[findResult].quantity+=parseInt(qty)
    //    }
    // setCartState(buff);
    console.log('PRODUCT : ',product)
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
