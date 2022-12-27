import React from 'react';
import {styled} from '@mui/material';
import Catalog from './Catalog/Catalog.jsx';
import Filters from './Filters/Filters.jsx';
import {webApp} from '../telegramUtils.js';
import {useParams} from 'react-router-dom';

const Base = styled('div')`

`;

function Home() {
  const {shopId} = useParams();
  console.log(shopId);
  if(webApp) {
    webApp.BackButton.hide();
  }

  return (
    <Base>
      <Filters/>
      <Catalog/>
    </Base>
  );
}

export default Home;
