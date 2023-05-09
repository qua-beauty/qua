import React from 'react';
import marketBg from '../../assets/market-bg.webp';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {isWorkingTime} from '../../helpers.js';
import {setCurrentShop} from '../../api/slices/shopSlice.js';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Market = ({ market, onSelect }) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isWorking = isWorkingTime(market.startTime, market.endTime) && market.available;

  const handleSelect = async (shop) => {
    
  };

  return (
    <Box onClick={handleSelect} sx={{
      background: `url(${marketBg}) no-repeat center`,
      backgroundSize: 'cover',
      filter: isWorking ? 'none' : 'grayscale(1)',
      height: '80px',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '24px'
    }}>
      <Heading fontSize={'2x1'} fontWeight={'500'}>
        Продукты
        <Box as={'span'} position={'relative'} top={'-2px'} ml={'4px'} textTransform={'uppercase'} bg={'black'} color={'white'} fontSize={'xs'} p={'0 4px'} borderRadius={'12px'}>Beta</Box>
      </Heading>
      <Flex alignItems={'center'} gap={'6px'}>
        <Text fontWeight={'500'} fontSize={'md'}>
          {!isWorking && market.available ? t('info.status.inactive') : ''}
          {isWorking ? market.workTime : (market.available ? market.startTime : t('info.status.closed'))}
        </Text>
      </Flex>
    </Box>
  );
};

export default Market;