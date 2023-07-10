import { Box, Card, Flex, FormControl, FormLabel, Text, useTheme, Tag } from '@chakra-ui/react';
import { rgba } from '../../utils';

export const FilterCard = ({ children, title, label, value, isExpanded }) => {
  const theme = useTheme();
  const bgColor = isExpanded ? theme.colors.background.paper : rgba(theme.colors.background.paper, 0.72);

  return (
    <Card boxShadow={isExpanded ? '0px 4px 16px 0px rgba(0, 0, 0, 0.10)' : ''} p='1rem' borderRadius='1rem' bg={bgColor}>
      {isExpanded ? (
        <FormControl>
          <FormLabel fontSize='lg' fontWeight={'500'}>{title}</FormLabel>
          <Box mt='1rem'>
            {children}
          </Box>
        </FormControl>
      ) : (
        <Flex gap='1' p='1'>
          <Text fontWeight='500' fontSize='lg' color='text.secondary' w='100px'>{label}</Text>
          <Text flex='1' fontWeight='500' fontSize='xl' color='text.primary'>{value}</Text>
          <Tag bg={rgba(theme.colors.brand['200'], 0.2)}>Soon</Tag>
        </Flex>
      )}
    </Card>
  )
}