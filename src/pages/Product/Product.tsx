import React, { FC, useState } from 'react';
import { Box, Container, Typography,Card , CardContent,ImageListItemBar, Grid, CardMedia } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from './Product.module.scss';
import {data} from '../../Data/product'

interface ProductProps {}

const Product: FC<ProductProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const count = Math.ceil(data.length / itemPerPage)


  const handleChangePage = (e:any, n:number) => {
    console.log(n);
    setCurrentPage(n);
  };

  //setting the pagination






  return(
  <div className={styles.Product}>
    <Container maxWidth='lg'>
    <Typography sx={{textAlign: 'left'}}>Products</Typography>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column',  md: 'row' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', }}>
        <CardContent sx={{ flex: '1 0 auto', width: {md: '350px' }}}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Millers
          </Typography>
        </CardContent>
      </Box>
      <Box>
        <Box sx={{ flexGrow: 1, mt: 2, display: { xs: '', sm: 'block' }}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 8, md: 12 }}>
            {data.map((el:any, index:number) => (
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CardMedia
                component="img"
                image={el.imgUrl}
                alt="Paella dish"
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
        <Box sx={{mt: 5}}>
          <Stack spacing={2} sx={{alignItems: 'end'}}>
            <Pagination 
              count={count} 
              page={currentPage}
              showFirstButton showLastButton 
              onChange={(e, n) => handleChangePage(e, n)}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
    </Container>
  </div>
);
}
export default Product;
