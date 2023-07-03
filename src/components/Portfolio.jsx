import React, { FunctionComponent, useState, useCallback } from "react";
import PortfolioView from "./Shop/PortfolioView";
import PortalPopup from "./Shop/PortalPopup";
import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react';

const Portfolio = ({ portfolio }) => {
  const [isIPhone1413Open, setIPhone1413Open] = useState(false);

  const openIPhone1413 = useCallback((event) => {
    event.stopPropagation();
    setIPhone1413Open(true);
  }, []);

  const closeIPhone1413 = useCallback(() => {
    setIPhone1413Open(false);
  }, []);

  return portfolio && (
    <>
      <Flex gap={'8px'}>
        {portfolio.map(portfolioItem => (
          <Box key={portfolioItem.url} borderRadius={'8px'} w='72px' overflow={'hidden'}>
            <Image
              alt=""
              src={portfolioItem.url}
              onClick={openIPhone1413}
            />
          </Box>
        ))}
      </Flex>

      {isIPhone1413Open && (
        <PortalPopup
          overla  yColor="rgba(0, 0, 0, 0.3)"
          placement="Centered"
          onOutsideClick={closeIPhone1413}
        >
          <PortfolioView portfolio={portfolio} onClose={closeIPhone1413} />
        </PortalPopup>
      )}
    </>
  );
};

export default Portfolio;
