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


interface ProductProps {}

const Product: FC<ProductProps> = () => {
  const numberOfItems:any = localStorage.getItem("ItemNumber")
  const dispatch = useDispatch()
  const products = useSelector(productsSelector)
  const isLoading = useSelector(productsLoadingSelector)
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 24;
  const [count, setCount] = useState(parseInt(numberOfItems) || 50)
  const [data, setData] = useState(dt)
  const [paginatedData, setPaginatedData] = useState<[]>([])

  //setting the pagination
  useEffect(() => { 
    const offset:number = (currentPage - 1) * itemPerPage
    const d:any = data.slice(offset).slice(0, itemPerPage)
    setPaginatedData(d)
    const fetchData = async () => {
        const request = await getProducts(currentPage, itemPerPage)
        const {status, data} = request
        dispatch(getAllProducts({status,data}))
  }
  fetchData();
  },[currentPage])

  useEffect(() => {

  }, [products])




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
            products.map((el:any, index:number) => {
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
            )})}
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
