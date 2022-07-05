import React, { useContext, useState, useEffect } from "react";

import { FilterContext } from "../context/productListAndFilter.context";

export default function ProductListFilter() {
  const {
    productsList,
    setProductsList,
    minPriceSelected,
    setMinPriceSelected,
    maxPriceSelected,
    setMaxPriceSelected,
    ratingSelected,
    setRatingSelected,
    categorySelected,
    setCategorySelected,
    isProductLoaded,
    setIsProductLoaded,
  } = useContext(FilterContext);

  const [maxPossiblePrice, setMaxPossiblePrice] = useState(0)
  const [minPossiblePrice, setMinPossiblePrice] = useState(0)
  const [possibleCategories, setPossibleCategories] = useState([])

  useEffect(()=>{
    setPossibleCategories(Array.from(new Set(productsList.map(product=>product.type))))
    console.log('----->',Array.from(new Set(productsList.map(product=>product.type))))
  },[productsList])

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

  const handleMinPriceSelected = (e) => {
    if(e.target.value<maxPriceSelected){
      setMinPriceSelected(e.target.value)
    }
    
  };
  const handleMaxPriceSelected = (e) => {
    if(e.target.value>minPriceSelected){
      setMaxPriceSelected(e.target.value);
    }
  };

  const handleRatingSelected = (e) =>{
    const temp = [...ratingSelected]
    console.log('name : ',e.target.name)
    console.log('checked : ',e.target.checked)
    temp[e.target.name]=e.target.checked
    console.log('temp : ',temp)
    setRatingSelected(temp)
    console.log(ratingSelected)
  }

  const handleAllRatingSelected = (e) =>{
    let temp = [...ratingSelected]
    if(e.target.checked){
      temp=temp.map(val=>true)
      setRatingSelected(temp)
    }else{
      temp=temp.map(val=>false)
      setRatingSelected(temp)
    }
  }

  const handleCategorySelected = (e) =>{
    console.log('value : ', e.target.value)
    setCategorySelected(e.target.value)
  }

  return (
    <div>
      <div className="priceFilters">
        <label htmlFor="minPriceSelected">minimum (price)</label>
        <input
          type="range"
          name="minPriceSelected"
          min={minPossiblePrice}
          max={maxPossiblePrice-1}
          value={minPriceSelected}
          onChange={handleMinPriceSelected}
        />
        <div>{minPriceSelected}</div>
        <label htmlFor="minPriceSelected">maximum (price)</label>
        <input
          type="range"
          name="maxPriceSelected"
          min={minPossiblePrice+1}
          max={maxPossiblePrice}
          value={maxPriceSelected}
          onChange={handleMaxPriceSelected}
        />
        <div>{maxPriceSelected}</div>
      </div>
      <div className="ratingSelectedFilters">
        <div>Select the ratingSelecteds you want</div>
        <label htmlFor="all">All/None</label>
        <input name="all" checked={ratingSelected.every(rat=>rat)} type="checkbox" onChange={handleAllRatingSelected}/>
        <label htmlFor="0">Unknown</label>
        <input name="0" checked={ratingSelected[0]} type="checkbox" onChange={handleRatingSelected}/>
        <label htmlFor="1">1</label>
        <input name="1" checked={ratingSelected[1]} type="checkbox" onChange={handleRatingSelected}/>
        <label htmlFor="2">2</label>
        <input name="2" checked={ratingSelected[2]} type="checkbox" onChange={handleRatingSelected}/>
        <label htmlFor="3">3</label>
        <input name="3" checked={ratingSelected[3]} type="checkbox" onChange={handleRatingSelected}/>
        <label htmlFor="4">4</label>
        <input name="4" checked={ratingSelected[4]} type="checkbox" onChange={handleRatingSelected}/>
        <label htmlFor="5">5</label>
        <input name="5" checked={ratingSelected[5]} type="checkbox" onChange={handleRatingSelected}/>
      </div>

      <label for="pet-select">Choose a pet:</label>

<select name="categories" id="categories" onChange={handleCategorySelected}>
    <option value='All'>All</option>
    {possibleCategories.map(cat=><option key={cat} value={cat}>{cat}</option>)}
</select>
      
    </div>
  );
}
