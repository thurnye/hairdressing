import React, { FC, useEffect, useState } from 'react';
import { GoogleLoginButton} from "react-social-login-buttons";
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "react-google-login";
import { gapi, loadAuth2 } from 'gapi-script'
import services from '../../../util/services';
import styles from './Google.module.scss';
import { login } from '../../../store/userSlice';
import { Box } from '@mui/material';

interface GoogleProps {}

const Google: FC<GoogleProps> = () => {

const clientId = `${process.env.React_App_GOOGLE_CLIENT_ID}`
// const clientId = ``

const handleGoogleSignIn = () => {
  console.log('clicked')
  const initClient = () => {
    gapi.auth2.init({
        clientId: clientId,
        scope: ''
    });
};
gapi.load('client:auth2', initClient);
}

const onSuccess = async (res:any) => {
  try {
    const {email, familyName, givenName, googleId, imageUrl} = res.profileObj

    const userData = {
      firstName: givenName,
      lastName: familyName,
      email,
      password: '',
      imageUrl,
      googleId,
    }
    const resp = await services.findUser('email', email)
    console.log(resp)
    if(resp.status === 204){
      const result = await services.createUser(userData)
      let token = result.data
      localStorage.setItem('token', token); 
    }else{
      let token = resp.data
      localStorage.setItem('token', token); 
    }
    window.location.replace('/') 
  } catch (error:any) {
    console.log('error', error.response)
  }
};

const onFailure = (err:any) => {
  console.log('entered2')
  
  console.log('failed', err);
};

  return(
  <div className={styles.Google}>
    <Box sx={{
      width: 'fit-content',
      margin: 'auto'
    }}
    onClick={ () => handleGoogleSignIn()}
    >
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        
      />
    </Box>
  </div>
);
}
export default Google;
