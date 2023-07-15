import React from "react";
import { Box, Flex, Text, Heading, Image, Avatar } from '@chakra-ui/react';
import MasterActions from "./MasterActions";
import Portfolio from "../Portfolio";
import Location from '../Location';

const Details = ({ master }) => {
  return master && (
    <Box p='1rem' position={'relative'}>
      <Flex direction='column' gap='1rem' alignItems='center'>
        <Avatar width={'140px'} height={'140px'} src={master.avatar} alt={master.name} name={master.name} />
        <Box textAlign={'center'}>
          <Text as='span' bg={master.category.color} color={master.category.textColor} fontSize='2xl'>{master.category.name}</Text>
          <Heading fontSize='4xl'>{master.name}</Heading>
        </Box>
        <Box position={'absolute'} top='1rem' right='1rem'>
          <Location address={master.address} />
        </Box>
        <MasterActions master={master} />
        <Box>
          <Text fontSize='lg'>{master.about}</Text>
        </Box>
        <Portfolio portfolio={master.portfolio} shopId={master.id} />
      </Flex>
    </Box>
  );
};

export default Details;
