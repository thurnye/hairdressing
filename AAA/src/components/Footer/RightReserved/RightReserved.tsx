import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './RightReserved.module.scss';

interface RightReservedProps {}

const RightReserved: FC<RightReservedProps> = () => {
   const year = new Date().getFullYear()
  
  return(
  <Box className={styles.RightReserved} sx={{
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems:{xs: 'inherit', sm: 'inherit', md: 'center' },
    // alignItems: 'flex-start',
    flexDirection: {xs: 'column-reverse', sm: 'column-reverse', md: 'row' }
  }}>
    <Box>
      <Typography variant="caption" display="block" gutterBottom>&copy;copyright torontostyles {year}</Typography>
    </Box>
    <Box>
      <Typography className={styles.iconContainer}> 
        <span>We accept</span>
        <span className={styles.paymentIcons}><FontAwesomeIcon icon={['fab', 'cc-paypal']} /></span>
        <span className={styles.paymentIcons}><FontAwesomeIcon icon={['fab', 'cc-visa']} /></span>
        <span className={styles.paymentIcons}><FontAwesomeIcon icon={['fab', 'cc-mastercard']} /></span>
      </Typography>
    </Box>
  </Box>
);
}
export default RightReserved;
