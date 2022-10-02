import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import BoxLayout from '../layout/BoxLayout/BoxLayout';
import About from './About/About';
import Connect from './Connect/Connect';
import Contact from './Contact/Contact';
import Container from '@mui/material/Container';
import styles from './Footer.module.scss';
import RightReserved from './RightReserved/RightReserved';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <>
    <Container maxWidth="lg">
    <Box className={styles.Footer} sx={{mt: 8}}>
      <Box sx={{
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: {xs: 'column-reverse', sm: 'column-reverse', md: 'row' }
      }}>
      <Contact/>
      <About/>
      <Connect/>
      </Box>
      <RightReserved/>
    </Box>
    </Container>
      <Box 
      sx={{height: 48, display: {xs: 'flex',  md: 'none' }}} 
      className={styles.footerNameContainer}>
        <Typography className={styles.footerName}>Toronto Styles</Typography>
      </Box>
  </>
);

export default Footer;
