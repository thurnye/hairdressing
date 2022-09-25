import React, { FC } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ImageListItem from '@mui/material/ImageListItem';
import styles from './Jumbotron.module.scss';
import { Box } from '@mui/material';
import img1 from '../../../public/img/homeImg/img1.png'
import img2 from '../../../public/img/homeImg/img2.jpeg'
import img4 from '../../../public/img/homeImg/img4.jpeg'
import img5 from '../../../public/img/homeImg/img5.png'



interface JumbotronProps {}

const Jumbotron: FC<JumbotronProps> = () => {

  const options = {
    loop: true,
    margin: 10,
    items: 1,
    autoplay: true
  };
  const data = [
    img1,
    img5,
    img4,
    img2,

  ]

  return(
    
  <Box className={styles.Jumbotron} sx={{margin: { xs: 0, sm: 0, md: '0 5px', lg: '0 50px'}}}>
    <OwlCarousel className="owl-theme" {...options}>
      {data.map((el:string) => 
        <div className="item" key={el}>
          {/* <img src={el} alt="img"/> */}
          <ImageListItem>
          <img
            src={`${el}`}
            srcSet={`${el}`}
            alt={'img'}
            loading="lazy"
            
          />
        </ImageListItem>
        </div>
        )}
    </OwlCarousel>
  </Box>
);
}
export default Jumbotron;
