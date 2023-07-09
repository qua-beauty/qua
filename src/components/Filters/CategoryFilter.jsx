import React from 'react';
import {Box, Text, Stack} from "@chakra-ui/react";
import FilterIcon from "../FilterIcon.jsx";



const CategoryFilter = ({onClick, categoryName}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      marginBottom="10px"
      onClick={() => onClick(categoryName)}
    >
      <Stack spacing="2">
       <FilterIcon name={categoryName}  />
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