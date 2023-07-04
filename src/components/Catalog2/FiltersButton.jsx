import React from "react";
import { useCallback } from "react";
import './Filters.css';
import { Button } from "@chakra-ui/react";

const FiltersButton = ({ onFiltersClick }) => {
  
  return (
    <Button
      onClick={onFiltersClick}
      colorScheme="brand"
      w='100%'
      h='56px'
      justifyContent={'space-between'}
      p='8px 12px'
    >
      <div className="filters-brand">QUA</div>
      <div className="flex flex-col items-center justify-start">
        <div className="filters-title">All beauty services</div>
        <div className="filters-items">Around 10km ○ Any price</div>
      </div>
      <div className="w-[2.5rem] flex flex-row items-center justify-end">
        <img
          className="relative w-[1.25rem] h-[1.25rem] "
          alt=""
          src="/tune-fill0-wght400-grad0-opsz48-1.svg"
        />
      </div>
    </Button>
  );
};

export default FiltersButton;
