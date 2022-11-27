import React, { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import styles from './Service.module.scss';
import Banner from './Banner/Banner';
import Intro from './Intro/Intro';
import Gallery from './Gallery/Gallery';


const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'PT Sans !important',
  }
}))

interface ServiceProps {}

const Service: FC<ServiceProps> = () => {
  const classes = useStyles()

  return(
  <Box className={`${styles.Service} ${classes.root}`}>
    <Container maxWidth="lg">

    <Typography variant="overline"  className={`${classes.root}`}display="block" gutterBottom sx={{mb:4, fontSize: 15, fontWeight: 'lighter'}}>ESTABLISED IN 1990</Typography>

    <Banner/>

    <Intro/>

    <Gallery />
    
    </Container>
  </Box>
);
}
export default Service;
