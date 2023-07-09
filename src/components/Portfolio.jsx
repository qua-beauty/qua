import React, { useState, useCallback } from "react";
import { Box, Flex, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';

const Portfolio = ({ portfolio, previewWidth = '82px' }) => {
  const [activePortfolio, setActivePortfolio] = useState(null);

  const handleModalOpen = useCallback((portfolio) => (event) => {
    event.stopPropagation();
    setActivePortfolio(portfolio);
  }, []);

  const handleModalClose = useCallback(() => {
    setActivePortfolio(null);
  }, []);

  return portfolio && (
    <>
      <Box maxW='100%' overflow='auto'>
        <Flex gap={'8px'}>
          {portfolio.map(portfolioItem => (
            <Box key={portfolioItem.url} borderRadius={'8px'} w={previewWidth} minW={previewWidth} overflow={'hidden'}>
              <Image
                alt=""
                src={portfolioItem.url}
                onClick={handleModalOpen(portfolioItem)}
              />
            </Box>
          ))}
        </Flex>
      </Box>

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
