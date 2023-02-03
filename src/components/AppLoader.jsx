import React from 'react';
import {CircularProgress, styled} from '@mui/material';
import Logotype from '../assets/logotype.png';

const Base = styled('div')`
  display: inline-flex;

  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 160px;
  height: 160px;
  
  img {
    position: absolute;
    width: 140px;
    height: 140px;
    
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;

const AppLoader = () => {
  return (
    <Base>
      <CircularProgress size={160} thickness={1} />
      <img src={Logotype} alt=""/>
    </Base>
  );
};

export default AppLoader;