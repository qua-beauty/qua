import React from 'react';
import Logotype from '../assets/logotype.png';
import {Box} from '@chakra-ui/react';

const AppLoader = () => {
  return (
    <Box>
      <img src={Logotype} alt=""/>
    </Box>
  );
};

export default AppLoader;