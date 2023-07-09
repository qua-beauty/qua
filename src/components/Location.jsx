import { Flex, Text } from '@chakra-ui/react';
import { NearMeIcon } from './Icons';

const Location = ({ children }) => {
  return (
    <Flex alignItems={'center'} color='text.secondary'>
      <NearMeIcon />
      <Text fontSize='md'>{children}</Text>
    </Flex>
  )
}

export default Location;