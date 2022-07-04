import React from 'react'

import './styles/Product.css'

const Product = ({product}) => {
  const starsNumber = Math.round(parseFloat(product.globalRate));
    const star = ''
    const array = []
    for(let i=1 ; i<=5 ; i++){
      if(i<=starsNumber){
        array.push('E')
      }else{
        array.push('X')
      }
    }
  
  return (
    <li className="product">
    <picture className='picture'>
    <img src={product.pictures[0]} alt={product.name} />
    </picture>
    
    <div className='description'>
    <p className='reviews'>Reviews : {array.map(x=>x==='E' ? <div>★</div> : <div>☆</div>)}</p>
    
    <h3>
    {product.name}
    </h3>

    <p className='price'>
      {product.price} €
    </p>
    <p>
     Stock : {product.stockQuantity}
    </p> 
    </div>
    </li>
  )
}

export default Product