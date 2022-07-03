import React from 'react'

import './styles/Product.css'

const Product = ({product}) => {
  return (
    <li key={product.id} className="product">
    <article>
    <img src={product.pictures[0]} alt="" />
    <p className='reviews'>Reviews : {}</p>
    
    <h2>
    {product.name}
    </h2>

    <p className='price'>
      {product.price}
    </p>
    <p>
     Stock : {product.stockQuantity}
    </p> 
    </article>
    </li>
  )
}

export default Product