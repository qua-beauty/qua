import { Flex, Text } from '@chakra-ui/react';
import { NearMeIcon } from './Icons';
import { useSelector } from 'react-redux';
import { getDistance } from '../maps';

const Location = ({ address }) => {
  const userGeo = useSelector(state => state.user.geo);
  const shopAddress = address.split(', ')
  const shopGeo = {
    lat: parseFloat(shopAddress[0]),
    lng: parseFloat(shopAddress[1])
  };

  return (userGeo && shopGeo) && (
    <Flex alignItems={'center'} color='text.secondary'>
      <NearMeIcon />
      <Text fontSize='md'>{getDistance(shopGeo, userGeo)}</Text>
    </Flex>
  )
}

export default Location;