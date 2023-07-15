import React, { useState, useCallback } from "react";
import { Box, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";



const Portfolio = ({ portfolio, shopId, previewWidth = '82px' }) => {
  const navigate = useNavigate();

  const handlePortfolioOpen = useCallback((portfolio) => (event) => {
    event.stopPropagation();
    navigate(`/shop/${shopId}/portfolio/${portfolio.id}`);
  }, []);


  return portfolio && (
    <>
      <Box maxW='100%' overflow='auto'>
        <Flex gap={'8px'}>
          {portfolio.map(portfolioItem => (
            <Box key={portfolioItem.url} borderRadius={'8px'} w={previewWidth} minW={previewWidth} overflow={'hidden'}>
              <Image
                alt=""
                src={portfolioItem.image}
                onClick={handlePortfolioOpen(portfolioItem)}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Portfolio;
