import React, { FC, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useLocation} from "react-router-dom";
import { Box, Container, Typography,Card , CardContent,ImageListItemBar, Grid, CardMedia } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import styles from './Product.module.scss';
import {data as dt} from '../../Data/product'
import {getProducts, getFilteredProducts} from '../../api/request'
import {getAllProducts, productsSelector, productsLoadingSelector} from '../../store/productSlice'
import {searchTextSelector} from '../../store/searchSlice'
import {getActiveComponent} from '../../store/categorySlice'
import Filter from './Filter/Filter';


interface ProductProps {}

const Product: FC<ProductProps> = () => {
  const location = useLocation()
  const numberOfItems:any = localStorage.getItem("ItemNumber")
  const { searchText, categoryID } = useParams();
  const {state} = location
  const dispatch = useDispatch()
  const products = useSelector(productsSelector)
  const [sortedProducts, setSortedProducts] = useState<any>([])
  const search:any = searchText?.replace(/(^\w{1})|(\s+\w{1})/g, el => el.toUpperCase());
  const category:any = categoryID?.toLocaleLowerCase()
  const [isLoading, setIsLoading] = useState(false)
  const loading = useSelector(productsLoadingSelector)
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 24;
  const count = parseInt(numberOfItems) || 5
  const [sort, setSort] =useState(state?.filters.sort || 'ascending')
 

  
  
  useEffect(() => {
    if(sort && products.length > 1){
      const dt = [...products]
      if( sort === 'ascending'){ 
        setSortedProducts(dt.sort((a:any, b:any) => a.displayName.localeCompare(b.displayName)))
      }
        if( sort === 'descending'){ 

          setSortedProducts(dt.sort((a:any, b:any) => -1 * a.displayName.localeCompare(b.displayName)));
        }

          if( sort === 'lowest'){ 

            setSortedProducts(dt.sort((a:any, b:any) => parseFloat(a.currentSku.listPrice) - parseFloat(b.currentSku.listPrice)));
          }
  
            if( sort === 'highest'){ 

              setSortedProducts(dt.sort((a:any, b:any) => parseFloat(b.currentSku.listPrice) - parseFloat(a.currentSku.listPrice)));
            }
    

      }
    }, [sort,products])
    console.log("sorted", sortedProducts)
  //setting the pagination
  useEffect(() => {
    setCurrentPage(1)
    dispatch(getActiveComponent('Products'))
  },[category, search])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  useEffect(() => { 
    const fetchData = async () => {
      console.log( searchText, categoryID )
      const filter:any = {
        category,
        search
      }
      if(category || search){
        const request = await getProducts(currentPage, itemPerPage, filter )
        const {status, data} = request
        dispatch(getAllProducts({status,data}))
      }
      if(state?.filters){
        const {filters} = state
        console.log(filters)
        const request = await getFilteredProducts(currentPage, itemPerPage, filters )
        const {status, data} = request
        dispatch(getAllProducts({status,data}))
      }
  }
  fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },[currentPage, category, search, state])



  // console.log('LOCATION', location, searchText, categoryID )


  return(
  <div className={styles.Product}>
    <Container  sx={{ maxWidth: { xs: 'lg', md: '1544px' }}}>
    <Typography sx={{textAlign: 'left'}}>Products</Typography>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column',  md: 'row' } }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'start'}}>
        <CardContent sx={{ flex: '1 0 auto', width: {md: '350px' }}}>
          <Filter getSort={(e:string)=> setSort(e)}/>
        </CardContent>
      </Box>
      <Box sx={{ ml: { xs: '', md: '100px' }}}>
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
            sortedProducts ? sortedProducts.map((el:any, index:number) => {
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
                  subtitle={<Typography>${price.toFixed(2)}</Typography>}
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
