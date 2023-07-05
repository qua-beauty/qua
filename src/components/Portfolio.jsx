import React, { FunctionComponent, useState, useCallback } from "react";

import { Box, Flex, Image, Heading, Text, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';

const Portfolio = ({ portfolio }) => {
  const [activePortfolio, setActivePortfolio] = useState(null);

  const handleModalOpen = useCallback((portfolio) => (event) =>  {
    event.stopPropagation();
    setActivePortfolio(portfolio);
  }, []);

  const handleModalClose = useCallback(() => {
    setActivePortfolio(null);
  }, []);

  return portfolio && (
    <>
      <Flex gap={'8px'}>
        {portfolio.map(portfolioItem => (
          <Box key={portfolioItem.url} borderRadius={'8px'} w='72px' overflow={'hidden'}>
            <Image
              alt=""
              src={portfolioItem.url}
              onClick={handleModalOpen(portfolioItem)}
            />
          </Box>
        ))}
      </Flex>

      <Modal onClose={handleModalClose} isOpen={activePortfolio} isCentered>
        <ModalOverlay />
        <ModalContent overflow={'hidden'}>
        <Image
              alt=""
              src={activePortfolio?.url}
            />
          <ModalCloseButton color="white" />
        </ModalContent>
      </Modal>

      
    </>
  );
};

export default Portfolio;
