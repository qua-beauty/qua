import { Flex, Box, Text, Heading, Avatar } from '@chakra-ui/react';

const CardContainer = ({ children }) => {
  return (
    <Flex background='background.paperImmersive' borderRadius='12px' h='56px' alignItems='center' p='8px 12px' gap='12px' direction='row' justifyContent={'space-between'}>
      {children}
    </Flex>
  )
}

export const MasterCard = () => {
  return (
    <CardContainer>
      <Avatar width='40px' height='40px'></Avatar>
      <Box flex='1'>
        <Text fontSize='md' fontWeight='500' color='brand.200'>Nail Maker</Text>
        <Text fontSize='2xl' color='text.primary'>Veronika Stepura</Text>
      </Box>
    </CardContainer>
  )
}

export const ProductCard = () => {
  return (
    <CardContainer>
      <Box>
        <Text fontSize='2xl' color='text.primary'>Nail design – 1 difficulty</Text>
        <Text fontSize='md' color='text.secondary'>Nail Maker</Text>
      </Box>
      <Box>
        <Heading fontSize='5xl' fontWeight='600'>$120</Heading>
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