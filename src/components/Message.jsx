import { Text, Box, Heading, Avatar, Flex, useTheme } from '@chakra-ui/react';

const Corner = ({ bg, border }) => {

  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 8.5V0.5C12.4183 0.5 16 4.08172 16 8.5C16 12.9183 12.4183 16.5 8 16.5H0C4.41828 16.5 8 12.9183 8 8.5Z" fill={bg} />
      <path d="M8.00766 6.06671e-06C8.00257 0.166046 8 0.332723 8 0.5V8.5C8 11.9369 5.83264 14.8677 2.79012 16C1.9214 16.3233 0.981333 16.5 0 16.5V16C4.14214 16 7.5 12.6421 7.5 8.5V0H8C8.00255 0 8.00511 3.81226e-06 8.00766 6.06671e-06Z" fill={border} />
      <path d="M14.8043 13.5951C13.2538 15.6625 10.7831 17 8 17H0V16.5H8C10.6168 16.5 12.9402 15.2436 14.3998 13.301C14.533 13.4011 14.6679 13.4991 14.8043 13.5951Z" fill={border} />
    </svg>
  )
}

const Message = ({ children, author, date, avatar }) => {
  const {colors: { background }} = useTheme();

  return (
    <Flex className="message" gap='12px' alignItems='flex-end'>
      <Avatar width='32px' height='32px' name={author} src={avatar} />
      <Box border={`0.5px solid ${background.default}`} position='relative' bg={background.paper} borderRadius='16px' wordWrap='break-word' p='8px 12px' maxW='320px'>
        <Box bottom='0' left='-8px' position='absolute'><Corner bg={background.paper} border={background.default} /></Box>
        <Heading color='brand.200' fontSize='lg' className="block">{author}</Heading>
        <Text fontSize='lg'>{children}</Text>
        <Box textAlign='right' mt={'2px'}>
          <Text fontSize='sm' color='text.secondary' className="block">{date}</Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default Message;