import React from 'react';
import {styled} from '@mui/material';
import Basket from './Basket/Basket.jsx';
import Header from './Header.jsx';
import BasketOrder from './Basket/BasketOrder.jsx';
import Footer from './Footer.jsx';
import {webApp} from './telegramUtils.js';
import useAuth from './Account/auth.js';
import Catalog from './Catalog/Catalog.jsx';
import Filters from './Catalog/Filters.jsx';

const Base = styled('div')`
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled('main')`
`;

const BasketBox = styled('div')`
  background: linear-gradient(74.19deg, #FAD0C4 9.5%, #FAD0C4 10.09%, #F0D9FF 68.93%);
  backdrop-filter: blur(2px);
  border-radius: 24px 24px 0 0;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 16px rgb(0 0 0 / 10%);

  z-index: 100;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  margin: 0 auto;
  max-width: 480px;
`;

function App() {
  useAuth();

  if(webApp) {
    webApp.BackButton.hide();
  }

  return (
    <Base className="App">
      {!webApp && <Header/>}
      <Main>
        <Catalog/>

      </Main>
      <BasketBox>
        <Basket/>
        <BasketOrder/>
        <Filters/>
      </BasketBox>
      {!webApp && <Footer/>}
    </Base>
  );
}

export default App;
