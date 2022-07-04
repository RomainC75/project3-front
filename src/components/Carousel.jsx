import React from 'react'
import { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import './styles/Carousel.css'
import CarouselImageCounter from './CarouselImageCounter';

export default function Carousel({images}) {
    console.log('inside carousel : ',images)
    const [imageIndex, setImageIndex]  = useState(0)
    const changeImageIndex = (direction) =>{
        if(imageIndex+direction>=0 && imageIndex+direction<images.length){
            setImageIndex(imageIndex+direction)
            console.log(imageIndex)
        }
    }   
  return (
    <div className="carousel">
        {images.length>0 && images.map(image=><img src={image} key={image} alt="carousel image" style={{transform:`translateX(-${imageIndex*225}px)`}}/>)}
        <div className="button minus" onClick={()=>changeImageIndex(-1)}><FontAwesomeIcon className="carouselCommand" icon={faMinus}/></div>
        <div className="button plus" onClick={()=>changeImageIndex(1)}><FontAwesomeIcon className="carouselCommand" icon={faPlus}/></div>
        {/* <div className="index">{imageIndex+1}/{images.length}</div> */}
        <CarouselImageCounter index={imageIndex} maxIndex={images.length}/>
    </div>
  )
}