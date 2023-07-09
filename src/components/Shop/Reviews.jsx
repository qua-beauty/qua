import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Message from "../Message";
import { SortControl } from '../SortControl.jsx';

const Reviews = ({ reviews }) => {
  return (
    <Box bg='background.reviews' p='1rem'>
      <Flex justifyContent={'space-between'} position={'relative'} zIndex={1}>
        <Heading fontSize='4xl' letterSpacing={'-1px'} fontWeight={'500'}>Reviews</Heading>
        <SortControl />
      </Flex>

      <Flex direction='column' alignItems={'center'} gap='24px' mt='24px' mb='16px'>
        {reviews.map(review => (
          <Message author={review.from.name} date={review.date} avatar={review.from.avatar}>
            {review.text}
          </Message>
        ))}
      </Flex>

      <Box p='0 32px' textAlign={'center'}>
        <Text fontSize='sm' color='text.disabled'>
          To leave a review you need to have an appointment
        </Text>
      </Box>
    </Box>
  );
};

export default Reviews;
