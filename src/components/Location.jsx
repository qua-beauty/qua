import { Flex, Image, Text } from '@chakra-ui/react';
import { NearMeIcon } from './Icons/NearMeIcon';

const Location = ({ children }) => {
  return (
    <Flex alignItems={'center'} color='text.secondary'>
      <NearMeIcon />
      <Text fontSize='md'>{children}</Text>
    </Flex>
  )
}

export default Location;