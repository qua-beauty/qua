import React from 'react';
import {styled} from '@mui/material';
import Catalog from './Catalog/Catalog.jsx';
import Filters from './Filters/Filters.jsx';
import {webApp} from '../telegram.js';

const Base = styled('div')`

`;

function Home() {
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
