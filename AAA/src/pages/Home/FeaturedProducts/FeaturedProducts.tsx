import React, { FC } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import img1 from '../../../public/img/ProductsImg/img1.png'
import {data} from '../../../Data/product'
import { Typography } from '@mui/material';
import styles from './FeaturedProducts.module.scss';

interface FeaturedProductsProps {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FeaturedProducts: FC<FeaturedProductsProps> = () => {

  const options = {
    loop: true,
    margin: 10,
    items: 1,
    autoplay: false,
    nav: true,
    dots: false,
  };
  const option2 = {
    loop: true,
    nav: false,
    items: 2,
    dots: false,
  }

  return(
  <div className={styles.FeaturedProducts}>
    <Box sx={{ flexGrow: 1, mt: 2, display: { xs: 'none', sm: 'block' }}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
        {data.map((el:any, index:number) => (
          <Grid item xs={4} sm={4} md={3} key={`data${el.imgUrl}_${index}`}>
            <img
            src={el.imgUrl}
            alt='hello'
            loading="lazy"
          />
          <ImageListItemBar
            title={el.name}
            subtitle={<Typography>{el.price}</Typography>}
            position="below"
          />
          </Grid>
        ))}
      </Grid>
    </Box>

    {/* Mobile view with carousel*/}
    <Box sx={{ flexGrow: 1, m: 2, display: { xs: 'block', sm: 'none' }}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
        <OwlCarousel className="owl-theme" {...options}>
          {data.map((el:any) => 
            <div className="item"  key={`data_owl${el.name}_`}>
              {/* <img src={el} alt="img"/> */}
              <Grid item xs={8} sm={4} md={3}>
                <ImageListItem>
                  <img
                    src={el.imgUrl}
                    alt='hello'
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={el.name}
                    subtitle={<Typography>{el.price}</Typography>}
                    position="below"
                  />
                </ImageListItem>
            </Grid>
            </div>
          )}
        </OwlCarousel>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 8, md: 12 }}>
        <OwlCarousel className="owl-theme" {...option2}>
          {data.map((el:any, i:number) => 
            <div className="item" key={`carousel-${el}_${i}`}>
              {/* <img src={el} alt="img"/> */}
              <Grid item xs={8} sm={4} md={3}>
                <ImageListItem  sx={{mt: 4}}>
                  <img
                    src={el.imgUrl}
                    alt='hello'
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={el.name}
                    subtitle={<Typography>{el.price}</Typography>}
                    position="below"
                    sx={{textAlign: 'center'}}
                  />
                </ImageListItem>
            </Grid>
            </div>
          )}
        </OwlCarousel>
      </Grid>
      
    </Box>
  </div>
)}
;

export default FeaturedProducts;
