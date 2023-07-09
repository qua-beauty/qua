import { Flex, Text, Box, Heading, Tag } from '@chakra-ui/react';
import { MainButton } from '../MainButton';

export const ProductPopup = ({ product, onSelect }) => {
  return product && (
    <>
      <Flex direction={'column'} justifyContent={'center'} p='1rem'>
        <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
          <Box>
            <Heading fontSize='4xl'>{product.name}</Heading>
            <Text fontWeight='500' mt='4px' fontSize='2xl' color='text.secondary'>{product.time}m</Text>
          </Box>
          <Tag size='lg' variant='solid' colorScheme='brand' fontSize='3xl'>
            ${product.price}
          </Tag>
        </Flex>
        {product.about && <Box mt='1rem'>
          <Text color='md'>{product.about}</Text>
        </Box>}
      </Flex>
      <MainButton onClick={async () => onSelect(product)}>Book</MainButton>
    </>
  )
}