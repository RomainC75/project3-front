import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import CarouselImageCounter from "./CarouselImageCounter";

import "./styles/Carousel.css";

export default function Carousel({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const changeImageIndex = (direction) => {
    if (imageIndex + direction >= 0 && imageIndex + direction < images.length) {
      setImageIndex(imageIndex + direction);
    }
  };
  return (
    <div className="carousel">
      {images.length > 0 &&
        images.map((image, i) => (
          <img
            src={image}
            key={`${image}-${i}`}
            alt={`${image}-${i}`}
            style={{ transform: `translateX(-${imageIndex * 225}px)` }}
          />
        ))}
      <div className="button minus" onClick={() => changeImageIndex(-1)}>
        <FontAwesomeIcon className="carouselCommand" icon={faMinus} />
      </div>
      <div className="button plus" onClick={() => changeImageIndex(1)}>
        <FontAwesomeIcon className="carouselCommand" icon={faPlus} />
      </div>
      <CarouselImageCounter index={imageIndex} maxIndex={images.length} />
    </div>
  );
}
