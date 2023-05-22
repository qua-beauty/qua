import React from 'react';
import {Box} from '@chakra-ui/react';
import {rgba} from '../utils.js';

export const Online = ({fontSize = '16px', ...rest}) => {
  return (
    <Box {...rest}
         as={'span'}
         width={fontSize}
         height={fontSize}
         display={'inline-flex'}
         verticalAlign={'middle'}
         borderRadius={fontSize}
         background={'#2DED58'}
         backgroundClip={'content-box'}
         border={`3px solid ${rgba('#2DED58', 0.2)}`}/>
  );
};
export const Offline = ({fontSize = '16px', ...rest}) => {
  return (
    <Box {...rest}
         as={'span'}
         width={fontSize}
         height={fontSize}
         display={'inline-flex'}
         verticalAlign={'middle'}
         borderRadius={fontSize}
         background={'#bdbdbd'}
         backgroundClip={'content-box'}
         border={`3px solid ${rgba('#bdbdbd', 0.1)}`}/>
  );
};

