import React, { FC } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import styles from './FeaturedService.module.scss';
import img5 from '../../../public/img/servicesImg/img5.jpg'
import img4 from '../../../public/img/servicesImg/img4.jpg'
import img6 from '../../../public/img/servicesImg/img6.jpg'
import { CardMedia } from '@mui/material';

interface FeaturedServiceProps {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const FeaturedService: FC<FeaturedServiceProps> = () => {
  const images = [img5, img4, img6];

return (
  <div className={styles.FeaturedService}>
    <Box sx={{ flexGrow: 1 , mt: 2}}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
        {images.map((el, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <CardMedia
              component="img"
              image={el}
              alt="featured services"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  </div>
);
}
export default FeaturedService;
