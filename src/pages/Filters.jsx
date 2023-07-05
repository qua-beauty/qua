import {useEffect} from 'react';
import {webApp} from '../telegram.js';
import {BackButton} from "../components/BackButton.jsx";
import {useSelector} from "react-redux";
import CategoryFilter from "../components/Filters/CategoryFilter.jsx";
import {Box, Flex, Text} from "@chakra-ui/react";

const Filters = () => {
  useEffect(() => {
    webApp?.BackButton.show();
    webApp?.BackButton.onClick(() => {
      navigate(`/`);
    });
  }, [])

  const allCategories = useSelector(state => state.categories.data);

  const handleClick = (categoryName) => () => {
    console.log(categoryName);

  };

  return (
    <>

      <BackButton></BackButton>
      <Flex
        display="flex"
        flexDir={"row"}
        flexWrap="wrap"
        maxWidth={358}
        flex="0 1 auto"
        p="12px 12px 0px 12px"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap="21px"
        flexShrink={0}
        borderRadius="16px"
        bg="white"
        boxShadow="0px 4px 16px 0px rgba(0, 0, 0, 0.10)"
      >
        <Text
          color="#000"
          fontSize="15px"
          fontFamily="SF Pro Text"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="24px"
          letterSpacing="-0.45px"
        >
          Which category you are interesting in?
        </Text>

        <Box m="12px">
          {allCategories && (
            <Flex flexDirection="row" flexWrap="wrap">
              {allCategories.map(category => (
                <Box key={category.name} width="33%">
                  <CategoryFilter
                    onClick={handleClick(category.name)}
                    categoryName={category.name}
                  />
                </Box>
              ))}
            </Flex>
          )}
        </Box>

      </Flex>

    </>

  )
}

export default Filters;