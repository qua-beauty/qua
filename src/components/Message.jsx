import { Text, Box, Heading, Avatar } from '@chakra-ui/react';

const Message = ({ children, author, date, avatar }) => {
  return (
    <div className="message">
      <Avatar name={author} src={avatar} />

      <div className="bubble-message bubble-message-received">
        <Heading color='brand.200' fontSize='lg' className="block">{author}</Heading>
        <Text fontSize='lg'>{children}</Text>
        <Box textAlign='right'>
          <Text fontSize='sm' color='text.secondary' className="block">{date}</Text>
        </Box>
      </div>
    </div>
  )
}

export default Message;