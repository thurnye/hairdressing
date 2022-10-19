import React, { FC } from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './Filter.module.scss';

interface FilterProps {}

const Filter: FC<FilterProps> = () => {
  const [sort, setSort] = React.useState('ascending');
  const [brand, setBrand] = React.useState('all');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const handleBrandChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
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
          <Box sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={brand}
                onChange={handleBrandChange}
              >
                <MenuItem value="all"><em>All Brands</em></MenuItem>
                <MenuItem value={'ascending'}>Alphabetically A - Z </MenuItem>
                <MenuItem value={'descending'}>Alphabetically Z - A </MenuItem>
                <MenuItem value={'lowest'}>Lowest Price to Highest Price</MenuItem>
                <MenuItem value={'highest'}>Hightest Price to Lowest Price</MenuItem>
              </Select>
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
