import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";

import "./styles/CarouselImageCounter.css";

export default function CarouselImageCounter({ index, maxIndex }) {
  const [arrayOfIndexes, setArrayOfIndexes] = useState([]);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < maxIndex; i++) {
      array.push(i <= index ? true : false);
    }
    setArrayOfIndexes(array);
  }, [index, maxIndex]);

  return (
    <div className="CarouselImageCounter index">
      {arrayOfIndexes.map((val, i) => {
        return val ? (
          <FontAwesomeIcon
            key={`${val}-${i}`}
            className="carouselImageCounter blue icon"
            icon={faCircle}
          />
        ) : (
          <FontAwesomeIcon
            key={`${val}-${i}`}
            className="carouselImageCounter blue"
            icon={faCircleDot}
          />
        );
      })}
    </div>
  );
}
