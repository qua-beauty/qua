import { Flex, Heading, Box, useTheme } from '@chakra-ui/react';
import { rgba } from '../../utils';

export const CategoryOption = ({ name, icon, isSelected, onClick }) => {
  const theme = useTheme();
  const bgColor = isSelected ? theme.colors.brand['200'] : rgba(theme.colors.brand['200'], 0.04)

  return (
    <Flex as={'button'} onClick={onClick} w='33.33%' direction='column' alignItems='center' justifyContent='flex-start' gap='8px' height='128px'>
      <Box w='72px' h='72px' borderRadius='36px' bg={bgColor}>
        <img src={icon} alt="" />
      </Box>
      <Heading fontSize='2xl'>{name}</Heading>
    </Flex>
  )
}