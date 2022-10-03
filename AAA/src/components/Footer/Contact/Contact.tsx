import React, { FC } from 'react';
import { Typography, Box } from '@mui/material';

import styles from './Contact.module.scss';
import { Mail, PhoneEnabled } from '@mui/icons-material';

interface ContactProps {}

const Contact: FC<ContactProps> = () => {
  
  return(
  <div className={styles.Contact}>
    <Typography variant="h5" gutterBottom sx={{textAlign: 'start', mt: 1}}>
        Contact Us
      </Typography>
      <Box sx={{textAlign: 'start'}}>
        <Typography className={styles.iconText}>
          <Mail className={styles.icon}/> 
          <span>torontostyles@gmail.com</span>
        </Typography>
        <Typography className={styles.iconText}> 
          <PhoneEnabled className={styles.icon}/>
          <span>416-629-1111</span>
        </Typography>
      </Box>
  </div>
);
}
export default Contact;
