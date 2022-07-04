import React, { useContext, useState, useEffect } from "react";

import { FilterContext } from "../context/productListAndFilter.context";

export default function ProductListFilter() {
  const {
    productsList,
    setProductsList,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    rating,
    setRating,
    category,
    isProductLoaded,
    setIsProductLoaded,
  } = useContext(FilterContext);

  const [maxPossiblePrice, setMaxPossiblePrice] = useState(0)
  const [minPossiblePrice, setMinPossiblePrice] = useState(0)

  useEffect(()=>{
    let maxPossiblePriceTemp = 0
    let minPossiblePriceTemp = 5000
    productsList.forEach(product=>{
      maxPossiblePriceTemp = product.price>maxPossiblePriceTemp ? product.price : maxPossiblePriceTemp
      minPossiblePriceTemp = product.price<minPossiblePriceTemp ? product.price : minPossiblePriceTemp
    })
    setMaxPossiblePrice(maxPossiblePriceTemp)
    setMinPossiblePrice(minPossiblePriceTemp)
  },[isProductLoaded])

  const handleMinPrice = (e) => {
    if(e.target.value<maxPrice){
      setMinPrice(e.target.value)
    }
    
  };
  const handleMaxPrice = (e) => {
    if(e.target.value>minPrice){
      setMaxPrice(e.target.value);
    }
  };

  const handleRating = (e) =>{
    const temp = [...rating]
    console.log('name : ',e.target.name)
    console.log('checked : ',e.target.checked)
    temp[e.target.name]=e.target.checked
    console.log('temp : ',temp)
    setRating(temp)
    console.log(rating)
  }
  return (
    <div>
      <div className="priceFilters">
        <label htmlFor="minPrice">minimum (price)</label>
        <input
          type="range"
          name="minPrice"
          min={minPossiblePrice}
          max={maxPossiblePrice-1}
          value={minPrice}
          onChange={handleMinPrice}
        />
        <div>{minPrice}</div>
        <label htmlFor="minPrice">maximum (price)</label>
        <input
          type="range"
          name="maxPrice"
          min={minPossiblePrice+1}
          max={maxPossiblePrice}
          value={maxPrice}
          onChange={handleMaxPrice}
        />
        <div>{maxPrice}</div>
      </div>
      <div className="ratingFilters">
        <div>Select the ratings you want</div>
        <label htmlFor="0">Unknown</label>
        <input name="0" checked={rating[0]} type="checkbox" onChange={handleRating}/>
        <label htmlFor="1">1</label>
        <input name="1" checked={rating[1]} type="checkbox" onChange={handleRating}/>
        <label htmlFor="2">2</label>
        <input name="2" checked={rating[2]} type="checkbox" onChange={handleRating}/>
        <label htmlFor="3">3</label>
        <input name="3" checked={rating[3]} type="checkbox" onChange={handleRating}/>
        <label htmlFor="4">4</label>
        <input name="4" checked={rating[4]} type="checkbox" onChange={handleRating}/>
        <label htmlFor="5">5</label>
        <input name="5" checked={rating[5]} type="checkbox" onChange={handleRating}/>
      </div>
      
    </div>
  );
}
