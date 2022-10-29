import React, { FC, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { Box } from '@mui/material';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { brandsSelector } from '../../../store/productSlice';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import styles from './Filter.module.scss';


interface State {
  sort: string
  minPrice: number;
  maxPrice: number;
  brand: string;
  brandV: string | null;
}


interface FilterProps {
  getSort: Function
}

const Filter: FC<FilterProps> = (props:FilterProps) => {
  const {getSort} = props
  // const [sort, setSort] = React.useState('ascending');
  const brands = useSelector(brandsSelector);
  // const [value, setValue] = React.useState<string | null>('');

  const [values, setValues] = React.useState<State>({
    sort: 'ascending',
    minPrice: 0,
    maxPrice: 1000,
    brand: "",
    brandV: brands[0],
  });



  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value)
    setValues({ ...values, [prop]: event.target.value });
  };


  return(
  <div className={styles.Filter}>
    {/* Desktop View */}
    <Box sx={{ display: { xs: 'none', md: 'inherit' }}}>
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box>
          <Typography sx={{ mb: 0.5 }}>Sort</Typography>
          <Divider />
          <Box sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.sort}
                // onChange={handleChange}
                onChange={(event: SelectChangeEvent) => {
                  setValues({ ...values, sort: event.target.value });
                  getSort(event.target.value)
                }}
              >
                <MenuItem value={'ascending'}>Alphabetically A - Z </MenuItem>
                <MenuItem value={'descending'}>Alphabetically Z - A </MenuItem>
                <MenuItem value={'lowest'}>Lowest Price to Highest Price</MenuItem>
                <MenuItem value={'highest'}>Hightest Price to Lowest Price</MenuItem>
              </Select>
            </FormControl>
          </Box>
            
        </Box>

        {/* Filter By */}
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ mb: 0.5 }}>Filter By</Typography>
          <Divider />

          {/* Brands - AutoSearch */}
        <Box sx={{ mt: 1 }}>
          <FormControl fullWidth>
          <Autocomplete
              value={values.brandV || null}
              onChange={(event: any, newValue: string | null) => {
                setValues({ ...values, brandV: newValue });
              }}
              inputValue={values.brand || ''}
              onInputChange={(event, newInputValue) => {
                setValues({ ...values, brand: newInputValue });
              }}
              disablePortal
              id="combo-box-brands"
              options={brands}
              sx={{}}
              placeholder="All Brands"
              renderInput={(params) => (
                <TextField {...params} placeholder="All Brands" />
              )}
            />
          </FormControl>
        </Box>

        {/* Min and Max */}
        <Box sx={{ width: "100%", mt: 1 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <Typography variant="caption"><i>Min Price</i></Typography>
                <OutlinedInput
                  id="outlined-adornment-minPrice"
                  value={values.minPrice}
                  onChange={handleChange("minPrice")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <Typography variant="caption"><i>Max Price</i></Typography>
                <OutlinedInput
                  id="outlined-adornment-maxPrice"
                  value={values.maxPrice}
                  onChange={handleChange("maxPrice")}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ width: "100%", mt: 1 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={7}>
            <Button 
            type="submit" 
            variant="contained" 
            className='buttonStyles' 
            // fullWidth 
            // onClick={() => handleSubmit()}
            >
              <Link  
              to={{
                pathname: "/products/filter",
              }}
              state= {{filters:values}}
              
              >Filter</Link>
            </Button>
            </Grid>
            
          </Grid>
        </Box>
            
        </Box>
          
      </Box>
    </Box>




    {/* Mobile View */}
    <Box sx={{ display: { xs: 'inherit', md: 'none' }}}>

     Mobile Filter Component
    </Box>
  </div>
);
}
export default Filter;
