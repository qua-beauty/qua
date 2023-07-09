import React, {Component, useState} from 'react';
import {BarbershopIcon, HairstyleIcon, MakeupIcon, ManicureIcon, PedicureIcon, SkinCareIcon} from "./Icons.jsx";



const FilterIcon = ({name}) => {
  const [fill, setFill] = useState('#000000'); // Исходное состояние - черный цвет


  const handleClick = () => {

    console.log('hi');
    setFill(fill === '#000000' ? '#ffffff' : '#000000'); // Переключение между черным и белым
  };

  const categoryImages = {
    "Hairstyle": <HairstyleIcon width='70px' height='72px'  fill={fill} onClick={handleClick}/>,
      "Manicure": <ManicureIcon width='70px' height='72px' fill={fill} onClick={handleClick}/>,
      "Makeup": <MakeupIcon width='70px' height='72px' fill={fill} onClick={handleClick}/>,
      "Barbershop": <BarbershopIcon width='70px' height='72px'fill={fill} onClick={handleClick}/>,
      "Pedicure": <PedicureIcon width='70px' height='72px'fill={fill} onClick={handleClick}/>,
      "Skin Care": <SkinCareIcon width='70px' height='72px' fill={fill} onClick={handleClick}/>,
      };

  return (
    categoryImages[name]
  );
}

export default FilterIcon;
