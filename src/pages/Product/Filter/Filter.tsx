import React, { FC, useEffect, useState } from 'react';
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
import styles from './Filter.module.scss';


const useStyles = makeStyles((theme:any) => ({
  menuPaper: {
    height: 450
  }
}));

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const classes = useStyles();
  const [sort, setSort] = React.useState('ascending');
  const brands = useSelector(brandsSelector);
  const [brand, setBrand] = React.useState('all');
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState(brands.slice(0, limit));
  const [value, setValue] = React.useState<string | null>('');


  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };


  const handleBrandChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
  };

  console.log('VALUE', value)

  useEffect(() => {
    setData(brands.slice(0, limit));
  }, [brands, limit]);


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
                value={sort}
                onChange={handleChange}
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
              disablePortal
              value={value}
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
              }}
              id="combo-box-demo"
              options={brands}
              sx={{}}
              placeholder="All Brands"
              renderInput={(params) => (
                <TextField {...params} placeholder="All Brands" />
              )}
            />
          </FormControl>
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
