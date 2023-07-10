import React from "react";
import { Box, Flex, IconButton, Avatar, Text, Divider, useTheme } from '@chakra-ui/react';
import { rgba } from "../../utils";
import { TelegramIcon, LikeOutlinedIcon, LikeIcon } from "../Icons";
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewsByShop } from '../../api/slices/reviewSlice';
import { useAddLikeMutation, useDeleteLikeMutation } from "../../api/api";
import { setShopLikes } from "../../api/slices/shopSlice";

const ReviewBadge = ({ emoji, color }) => {
  return (
    <Box bg={color} w='32px' h='32px' borderRadius='16px' fontSize='5xl' textAlign={'center'} verticalAlign={'middle'}>{emoji}</Box>
  )
}

const MasterActions = ({ master }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const reviews = useSelector(selectReviewsByShop(master?.id));
  const user = useSelector(state => state.user.data);
  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();

  const handleLike = async () => {
    const isMasterLiked = master?.likes?.some(like => like.id === user.id);
    let likes;

    if (isMasterLiked) {
      likes = master.likes.filter(like => like.id !== user.id);
      await deleteLike([{
        id: master.id,
        likes: likes.map(like => like.id)
      }])
    } else {
      likes = [{
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }].concat(master.likes.map(like => like))
      
      await addLike([{
        id: master.id,
        likes: likes.map(like => like.id)
      }])
    }

    dispatch(setShopLikes(likes));
  }

  const likesLength = master?.likes?.length;
  const firstLikes = master?.likes?.slice(0, 3);
  const isMasterLiked = master?.likes?.some(like => like.id === user.id);

  console.log(master?.likes);

  return (
    <Flex w='100%' gap='1rem' p='10px 1rem' alignItems={'center'} bg={rgba(theme.colors.brand['200'], 0.1)} borderRadius='1rem'>
      <Flex gap='8px' flex='1' justifyContent={'center'}>
        <IconButton as='a' href={`https://t.me/${master.username}`} size='lg' colorScheme="brand" isRound={true} p='0' w='48px' h='48px'>
          <TelegramIcon fontSize='56px' />
        </IconButton>
        <IconButton onClick={handleLike} size='lg' colorScheme="brand" isRound={true}>
          {isMasterLiked
            ? <LikeIcon color='text.onPrimary' mt='2px' fontSize='32px' />
            : <LikeOutlinedIcon color='text.onPrimary' mt='2px' fontSize='32px' />}
        </IconButton>
      </Flex>
      {likesLength > 0 && <>
        <Divider borderColor='rgba(0, 0, 0, 0.2)' h='48px' orientation='vertical' />
        <Flex direction='column' justifyContent={'center'} flex='1' textAlign={'center'}>
          <Text fontSize='xs' fontWeight='500'>Liked by</Text>
          <Flex justifyContent={'center'}>
            {firstLikes.map(like => (
              <Avatar key={like.id} src={like.avatar} w='32px' h='32px' name={like.name} ml={'-8px'} />
            ))}

            {likesLength > 3 && (
              <Avatar ml={'-8px'} w='32px' h='32px' name={`+ ${likesLength - 3}`} bg={'brand.200'} color='text.onPrimary' sx={{
                '& div': {
                  fontSize: '0.875rem'
                }
              }} />
            )}

          </Flex>
        </Flex>
      </>}

      {reviews?.length > 0 && <>
        <Divider borderColor='rgba(0, 0, 0, 0.2)' h='48px' orientation='vertical' />
        <Flex direction={'column'} justifyContent={'center'} flex='1' textAlign={'center'}>
          <Text fontSize='xs' fontWeight='500'>{reviews.length} reviews</Text>
          <Flex justifyContent={'center'}>
            <ReviewBadge emoji='👍' color='#EDFFB1' />
          </Flex>
        </Flex>
      </>}
    </Flex>
  );
};

export default MasterActions;
