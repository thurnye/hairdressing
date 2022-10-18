import React, { FC, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Box, Container, Typography,Card , CardContent,ImageListItemBar, Grid, CardMedia } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styles from './Product.module.scss';
import {data as dt} from '../../Data/product'
import {getProducts} from '../../api/request'
import {getAllProducts, productsSelector, productsLoadingSelector} from '../../store/productSlice'
import {searchTextSelector} from '../../store/searchSlice'
import {categorySelector} from '../../store/categorySlice'


interface ProductProps {}

const Product: FC<ProductProps> = () => {
  const numberOfItems:any = localStorage.getItem("ItemNumber")
  const localStorageSelectedCategory:any = localStorage.getItem("selectedCategory")
  const dispatch = useDispatch()
  const products = useSelector(productsSelector)
  const search = useSelector(searchTextSelector)
  const category = useSelector(categorySelector) || localStorageSelectedCategory
  const [isLoading, setIsLoading] = useState(false)
  const loading = useSelector(productsLoadingSelector)
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 24;
  const count = parseInt(numberOfItems) || 50

  //setting the pagination
  useEffect(() => {
    setCurrentPage(1)
  },[category])
  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

// console.log('localStorageSelectedCategory', localStorageSelectedCategory)
  useEffect(() => { 
    const fetchData = async () => {
      // console.log(currentPage, itemPerPage, category)
        const request = await getProducts(currentPage, itemPerPage, category )
        const {status, data} = request
        dispatch(getAllProducts({status,data}))
  }
  fetchData();
  },[currentPage, category])


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
          
            {
              isLoading ? Array.from(new Array(itemPerPage)).map((_, index )=> 
              <Grid item xs={6} sm={4} md={4} key={`ProductsSkeleton_${index}`}>
                <Skeleton variant="rectangular"  height={150} sx={{width:{md: 240}}}/>
                <Skeleton variant="rectangular"  height={18} sx={{mt: 2, width:{md: 240}}}/>
                <Skeleton variant="rectangular" width={'60%'} height={18} sx={{mt: 1}}/>
              </Grid>)
            :
            products ? products.map((el:any, index:number) => {
              const price = el.currentSku.listPrice || el.currentSku.salePrice || el.currentSku.valuePrice
              return(
              <Grid item xs={6} sm={4} md={4} key={index}>
                <CardMedia
                component="img"
                image={el.image450}
                alt="Paella dish"
                />
                <ImageListItemBar
                  title={el.displayName}
                  subtitle={<Typography>{price}</Typography>}
                  position="below"
                />
              </Grid>
            )})
            : <Box>something went wrong</Box>
            }
          </Grid>
        </Box>
        <Box sx={{mt: 5}}>
          <Stack spacing={2} sx={{alignItems: 'end'}}>
            <Pagination 
              count={count} 
              page={currentPage}
              showFirstButton showLastButton 
              onChange={(_, n:number) => setCurrentPage(n)}
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
