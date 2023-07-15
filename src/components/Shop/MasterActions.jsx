import React from "react";
import { Box, Flex, IconButton, Avatar, Text, Divider, useTheme } from '@chakra-ui/react';
import { rgba } from "../../utils";
import { LikeOutlinedIcon, LikeIcon, ChatIcon } from "../Icons";
import { useDispatch, useSelector } from 'react-redux';
import { selectReviewsByShop } from '../../api/slices/reviewSlice';
import { useAddLikeMutation, useDeleteLikeMutation } from "../../api/api";
import { setShopLikes } from "../../api/slices/shopSlice";

const ReviewBadge = ({ emoji, color, ...rest }) => {
  return (
    <Box bg={color} w='32px' h='32px' borderRadius='16px' fontSize='5xl' textAlign={'center'} lineHeight={'32px'} {...rest}>{emoji}</Box>
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

  const firstLikes = master?.likes?.slice(0, 2);
  const isMasterLiked = master?.likes?.some(like => like.id === user.id);

  return (
    <Flex w='100%' gap='1rem' alignItems={'center'} justifyContent={'center'}>
      <IconButton as='a' href={`https://t.me/${master.username}`} w='60px' size='lg'>
        <ChatIcon fontSize='32px' />
      </IconButton>
      
      <IconButton onClick={handleLike} size='lg' colorScheme="brand">
        <Flex p='0 8px 0 12px' gap='16px' alignItems='center'>
          <Flex gap='8px' alignItems='center'>
            {isMasterLiked
              ? <LikeIcon color='#F03F3F' mt='2px' fontSize='32px' />
              : <LikeOutlinedIcon color='brand.200' mt='2px' fontSize='32px' />}
            <Text fontSize='3xl' fontWeight='600' color='text.primary'>24</Text>
          </Flex>
          {firstLikes && <Box pl='12px'>
            {firstLikes.map(like => (
              <Avatar key={like.id} src={like.avatar} w='32px' h='32px' name={like.name} ml={'-12px'} />
            ))}
          </Box>}
        </Flex>
      </IconButton>

      {reviews?.length > 0 && <IconButton onClick={handleLike} size='lg' colorScheme="brand">
        <Flex p='0 16px 0 12px' gap='12px' alignItems='center'>
          <Flex>
            <ReviewBadge emoji='👍' color='#EDFFB1' />
            <ReviewBadge emoji='😍' color='#FFD7EC' ml='-12px' />
          </Flex>
          <Text fontSize='3xl' fontWeight='600' color='text.primary'>{reviews.length}</Text>
        </Flex>
      </IconButton>}
    </Flex>
  );
};

export default MasterActions;
