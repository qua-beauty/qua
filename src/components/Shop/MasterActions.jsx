import React from "react";
import { Box, Flex, IconButton, Avatar, Text, Divider, useTheme } from '@chakra-ui/react';
import { rgba } from "../../utils";
import { TelegramIcon, LikeOutlinedIcon } from "../Icons";

const ReviewBadge = ({ emoji, color }) => {
  return (
    <Box bg={color} w='32px' h='32px' borderRadius='16px' fontSize='5xl' textAlign={'center'} verticalAlign={'middle'}>{emoji}</Box>
  )
}

const MasterActions = () => {
  const theme = useTheme();

  return (
    <Flex w='100%' gap='1rem' p='10px 1rem' alignItems={'center'} bg={rgba(theme.colors.brand['200'], 0.1)} borderRadius='1rem'>
      <Flex gap='8px' flex='1' justifyContent={'center'}>
        <IconButton size='lg' colorScheme="brand" isRound={true} p='0' w='48px' h='48px'>
          <TelegramIcon fontSize='56px' />
        </IconButton>
        <IconButton size='lg' colorScheme="brand" isRound={true}>
          <LikeOutlinedIcon color='text.onPrimary' mt='2px' fontSize='32px' />
        </IconButton>
      </Flex>
      <Divider borderColor='rgba(0, 0, 0, 0.2)' h='48px' orientation='vertical' />
      <Flex direction='column' justifyContent={'center'} flex='1' textAlign={'center'}>
        <Text fontSize='xs' fontWeight='500'>Liked by</Text>
        <Flex justifyContent={'center'}>
          <Avatar w='32px' h='32px' name='Vk' />
          <Avatar w='32px' h='32px' name='+ 4' bg={'brand.200'} color='text.onPrimary' sx={{
            '& div': {
              fontSize: '0.875rem'
            }
          }} />
        </Flex>
      </Flex>
      <Divider borderColor='rgba(0, 0, 0, 0.2)' h='48px' orientation='vertical' />
      <Flex direction={'column'} justifyContent={'center'} flex='1' textAlign={'center'}>
        <Text fontSize='xs' fontWeight='500'>2 reviews</Text>
        <Flex justifyContent={'center'}>
          <ReviewBadge emoji='👍' color='#EDFFB1' />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MasterActions;
