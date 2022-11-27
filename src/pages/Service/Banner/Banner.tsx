import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import styles from './Banner.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'PT Sans !important',
  }
}))

interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  const classes = useStyles();
  
  return(
  <div className={styles.Banner}>
   <Typography 
    variant="h3" 
    gutterBottom 
    sx={{fontSize: {
      xs: '3rem', sm: '6rem' ,md: '8rem'},
      letterSpacing: {xs: 3, sm: 4, md: 5.2},
      ml: 2,
      mb: 1
    }} 
    className={classes.root}
  >5 SALONS</Typography>


   <Typography 
    variant="h4" 
    gutterBottom 
    sx={{
      fontSize: {xs: '1.6rem', sm: '3rem' ,md: '4rem'},
      letterSpacing: {xs: 1, sm: 2, md: 3.2},
      ml: 2,
    }} 
    className={classes.root}
    >ACROSS CANADA</Typography>
  </div>
);
}
export default Banner;
