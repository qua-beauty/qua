import React from 'react';
import {Box, Image, Button, Text, Stack} from "@chakra-ui/react";
import {ManicureIcon} from './ManicureIcon';

const categoryImages = {
  "Hairstyle": "../src/assets/filters/hairstyle.svg",
  "Manicure": "../src/assets/filters/manicure.svg",
  "Makeup": "../src/assets/filters/makeup.svg",
  "Barbershop": "../src/assets/filters/barbershop.svg",
  "Pedicure": "../src/assets/filters/pedicure.svg",
  "Skin Care": "../src/assets/filters/skinCare.svg",
};

const CategoryFilter = ({onClick, categoryName}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"й  
      marginBottom="10px"
      onClick={() => onClick(categoryName)}
    >
      
      <Stack spacing="2">
      <ManicureIcon width='72px' height='70px' />
        <Text
          cursor="pointer"
          color="#110E34"
          textAlign="center"
          fontSize="17px"
          fontFamily="SF Pro Display"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="18px"
          letterSpacing="-0.34px"
        >
          {categoryName}
        </Text>
      </Stack>
    </Box>
  );
};

export default CategoryFilter;