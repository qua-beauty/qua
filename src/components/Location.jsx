import { Flex, Image, Text } from '@chakra-ui/react';

const Location = ({ children }) => {
  return (
    <Flex alignItems={'center'}>
      <Image
        alt={'location'}
        src="/near-me-fill1-wght400-grad0-opsz48-1.svg" />
      <Text fontSize='md'>{children}</Text>
    </Flex>
  )
}

export default Location;