import { Flex, Box, Text, Heading, Avatar } from '@chakra-ui/react';

const CardContainer = ({ children }) => {
  return (
    <Flex background='background.paperImmersive' borderRadius='12px' h='56px' alignItems='center' p='8px 12px' gap='12px' direction='row' justifyContent={'space-between'}>
      {children}
    </Flex>
  )
}

export const MasterCard = ({ shop }) => {
  return shop && (
    <CardContainer>
      <Avatar src={shop.avatar} width='40px' height='40px'></Avatar>
      <Box flex='1'>
        <Text fontSize='md' fontWeight='500' color='brand.200'>{shop.category.name}</Text>
        <Text fontSize='2xl' color='text.primary'>{shop.name}</Text>
      </Box>
    </CardContainer>
  )
}

export const ProductCard = ({ product }) => {
  return product && (
    <CardContainer>
      <Box>
        <Text fontSize='2xl' color='text.primary'>{product.name}</Text>
        <Text fontSize='md' color='text.secondary'>{product.time}m</Text>
      </Box>
      <Box>
        <Heading fontSize='5xl' fontWeight='600'>${product.price}</Heading>
      </Box>
    </CardContainer>
  )
}

export const DateTimeCard = () => {
  return (
    <CardContainer>
      <Box>
        <Text fontSize='2xl' color='text.primary'>Wednesday 13</Text>
      </Box>
      <Box>
        <Heading fontSize='3xl'>14:30 – 16:00</Heading>
      </Box>
    </CardContainer>
  )
}