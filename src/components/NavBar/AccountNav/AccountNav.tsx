import React, { FC } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { gapi, loadAuth2 } from 'gapi-script'
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Box, Divider, IconButton, Menu, MenuItem, Popover, Typography } from '@mui/material';
import styles from './AccountNav.module.scss';
import { logout, userSelector } from '../../../store/userSlice';

interface AccountNavProps {}

const AccountNav: FC<AccountNavProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const dispatch = useDispatch()
  const user = useSelector(userSelector);

  const handleAccountClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // const logOut = () => {
  //   const auth2 = gapi.auth2.getAuthInstance();
  //     auth2.signOut().then(() => {
        
  //       setProfile(null);
  //       console.log('User signed out.');
  
  //     });
  // };
  
  const handleLogOut = () => {
    handleAccountClose()
    dispatch(logout())
    let token = localStorage.getItem('token')
    if (token){
      localStorage.removeItem('token')
    }
  }

  console.log('User', user)

  
  
  return(
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls='primary-search-account-menu'
        aria-haspopup="true"
        color="inherit"
        aria-describedby={id}
        onClick={handleAccountClick}
        className={styles.AccountNav}
      >
        <AccountCircle className={styles.icons}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleAccountClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem onClick={handleAccountClose}>
          <Link to="/my-account" className={styles.logo} >
              <Typography sx={{ p: 2 }}>My Account</Typography>
          </Link>
        </MenuItem>

        <Divider sx={{mt:2, mb: 2, mr: 1, ml: 1}}/>
        
        {
          user ?  <MenuItem onClick={() => handleLogOut()}><Typography sx={{ p: 2 }}>logout</Typography></MenuItem>
          :
          <MenuItem onClick={handleAccountClose}>
            <Link to="/login" className={styles.logo} >
              <Typography sx={{ p: 2 }}>login</Typography>
          </Link>
          </MenuItem>

        }
        
      </Menu>
    </>
);}

export default AccountNav;
