import React, { FC } from 'react';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';
import FeaturedService from './FeaturedService/FeaturedService';
import styles from './Home.module.scss';
import Jumbotron from './Jumbotron/Jumbotron';
import {TextStyle} from '../../components/index'
import Container from '@mui/material/Container';

interface HomeProps {}

const Home: FC<HomeProps> = () => (
  <div className={styles.Home}>
    <Jumbotron/>
    <Container maxWidth="lg"> 
      <FeaturedService/>
      <TextStyle text='FEATURED PRODUCTS'/>
      <FeaturedProducts/>
    </Container>
  </div>
);

export default Home;
