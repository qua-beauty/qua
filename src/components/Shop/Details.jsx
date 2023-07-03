import React, { FunctionComponent } from "react";
import MasterActions from "./MasterActions";
import Portfolio from "../Portfolio";
import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react';
import Location from '../Location';

const Details = ({master}) => {
  return master && (
    <Flex direction='column' p='1rem' gap='1rem'>
      <Flex direction='column' gap='1rem' alignItems={'center'}>
        <Box width="120px" h='120px' borderRadius={'100%'} overflow={'hidden'}>
          <Image src={master.avatar}></Image>
        </Box>
        <Box bg={master.category.color} color={master.category.textColor} fontSize='md'>
          {master.category.name}
        </Box>
        <Heading mt='-8px' fontSize='4x1' fontWeight={'medium'}>{master.name}</Heading>
        <Box position='absolute' top='1rem' right='1rem'>
        <Location>300m</Location>
        </Box>
      </Flex>
      <MasterActions />
      <Text fontSize='md'>{master.about}</Text>
      <Portfolio portfolio={master.portfolio} />
    </Flex>
  );
};

export default Details;
