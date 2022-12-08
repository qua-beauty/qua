import * as React from 'react';
import {AppBar, Toolbar, Typography, IconButton, styled} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {auth, logout} from './firebase.js';
import logotypeSvg from './assets/logotype.svg';

const Base = styled(AppBar)`
  border: none;
  border-bottom: none;
  margin-bottom: 16px;
`;

const Logo = styled(Typography)`
  padding: 36px 20px 16px;
  text-align: center;
  
  cursor: pointer;
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <Base position="static" color="transparent" variant="outlined" elevation={0}>
      <Toolbar>
        <Logo variant="h6" component="div" sx={{flexGrow: 1}}>
          <img src={logotypeSvg} alt="lanka.cafe"/>
        </Logo>
        {auth.currentUser && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>Sign Out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </Base>
  );
};

export default Header;