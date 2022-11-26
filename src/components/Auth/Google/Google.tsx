import React, { FC, useEffect, useState } from 'react';
import { GoogleLoginButton} from "react-social-login-buttons";
import { GoogleLogin } from "react-google-login";
import { gapi, loadAuth2 } from 'gapi-script'
import styles from './Google.module.scss';
import { login } from '../../../store/userSlice';
import { Box } from '@mui/material';

interface GoogleProps {}

const Google: FC<GoogleProps> = () => {

  const [user, setUser] = useState<any>(null);
  const [ profile, setProfile ] = useState([]);

const clientId = `${process.env.React_App_GOOGLE_CLIENT_ID}`

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

const onSuccess = (res:any) => {
  setProfile(res.profileObj);
};

const onFailure = (err:any) => {
  console.log('failed', err);
};

const logOut = () => {
  setProfile([]);
};

console.log(profile)

  return(
  <div className={styles.Google}>
        <Box sx={{
          border: '2px dotted red',
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
          <div className="container">

            {
              profile ? <div id="" className="btn logout" onClick={() => logOut()}>
              Logout
            </div>
            : 
            <div id="customBtn" className="btn login">
              Login
            </div>
            }
      
    </div>
  </div>
);
}
export default Google;
