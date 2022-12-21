import React from 'react';
import {styled} from '@mui/material';
import Catalog from './Catalog/Catalog.jsx';
import Filters from './Filters/Filters.jsx';

const Base = styled('div')`

`;

function Home() {
  return (
    <Base>
      <Filters/>
      <Catalog/>
    </Base>
  );
}

export default Home;
