import React from "react";
import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react';
import Portfolio from "../Portfolio";
import Location from "../Location";

const MasterCard = ({ onSelect, ...master }) => {
  return (
    <Flex
      p={'1rem'}
      gap={'1rem'}
      w={'100%'}
      onClick={onSelect}
      background='background.paperMaster'
      borderRadius='16px'
    >
      <Box w={'56px'}>
        <Flex direction="column" alignItems={'center'}>
          <Box borderRadius={'100%'} overflow={'hidden'} w={'56px'} h={'56px'}>
            <Image alt={master.name} src={master.avatar} />
          </Box>
          <Text mt='1' fontSize='md'>~$120</Text>
        </Flex>
      </Box>
      <Box flex={1} maxW={'calc(100% - 56px - 1rem)'}>
        <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
          <Box>
            <Box bg={master.category.color} color={master.category.textColor} display="inline" fontSize='md'>
              {master.category.name}
            </Box>
            <Text fontSize='lg'>{master.name}</Text>
          </Box>
          <Location address={master.address} />
        </Flex>
        <Box mt='3'>
          <Portfolio portfolio={master.portfolio} shopId={master.id} previewWidth='60px' />
        </Box>
      </Box>
    </Flex>
  );
};

export default MasterCard;
