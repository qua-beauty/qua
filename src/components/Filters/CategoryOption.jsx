import { Flex, Heading, Box, useTheme } from '@chakra-ui/react';
import { rgba } from '../../utils';
import { getCategoryIcon } from './Icons';

export const CategoryOption = ({ name, isSelected, onClick }) => {
  const theme = useTheme();
  const bgColor = isSelected ? theme.colors.brand['200'] : rgba(theme.colors.brand['200'], 0.04);
  const icon = getCategoryIcon(name);

  return (
    <Flex as={'button'} onClick={onClick} w='33.33%' direction='column' alignItems='center' justifyContent='flex-start' gap='8px' height='128px'>
      <Box w='72px' h='72px' borderRadius='36px' bg={bgColor} sx={{
        '& svg': {
          color: isSelected ? theme.colors.text.onPrimary : theme.colors.text.primary
        }
      }}>
        {icon}
      </Box>
      <Heading fontSize='2xl'>{name}</Heading>
    </Flex>
  )
}