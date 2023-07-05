import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Message from "../Message";

const Reviews = ({ reviews }) => {
  return (
    <Box>
      <Flex justifyContent={'space-between'} position={'relative'} zIndex={1}>
        <Heading fontSize='20px' letterSpacing={'-1px'} fontWeight={'500'}>Reviews</Heading>
        <Text>
          Sort by <Text as='span' color='telegram.200'>Date</Text>
        </Text>
      </Flex>

      <Flex direction='column' gap='24px' mt='16px' mb='16px'>
        {reviews.map(review => (
          <Message author={review.from.name} date={review.date} avatar={review.from.avatar}>
            {review.text}
          </Message>
        ))}
      </Flex>

      <Text fontSize='sm' color='text.disabled'>
          To leave a review you need to have an appointment
        </Text>
    </Box>
  );
};

export default Reviews;
