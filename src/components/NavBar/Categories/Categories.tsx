import React, { FC } from 'react';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { categoriesSelector, getSelectedcategory } from '../../../store/productSlice';
import Typography from '@mui/material/Typography'
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/material';
import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Categories.module.scss';

interface CategoriesProps {
  closeToggleDrawer: Function
}


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 200,
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Categories: FC<CategoriesProps> = (props) => {
  const {closeToggleDrawer} = props
  const dispatch = useDispatch()
  const [openCategory, setOpenCategory] = React.useState(true);
  const categories = useSelector(categoriesSelector)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getProductCategory = (category:string) => {
    handleClose();
    closeToggleDrawer(false)
    dispatch(getSelectedcategory(category))
  }

  return(
  <div className={styles.Categories}>
    {/* Mobile Category */}
    <Box sx={{ display: { xs: 'inherit', sm: 'none' }}}>
        <Accordion sx={{boxShadow: 'none'}}> 
          <AccordionSummary
           sx={{backgroundColor: 'none', p:0}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ml:2}}>Products</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <List dense={true} sx={{pt:0}}>
              {categories && categories.map((el:any, i:number) => {
                return(
              <ListItem  sx={{p:0}} key={`CategoriesAccordion_${el.displayName}${i}`} 
              onClick={() => getProductCategory(el.displayName)}>
                <ListItemText>
                <Link to={`/products/${el.displayName}`}>{el.displayName}</Link>
                  </ListItemText>
              </ListItem>
              )})}
            </List>
            </Box>
          </AccordionDetails>
      </Accordion>
   
    </Box>



    {/* Desktop Category */}
    <Box sx={{ display: { xs: 'none', sm: 'inherit' }}}>
    <Typography
          id="demo-customized-button"
          aria-controls={open ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            display:"flex",
            alignItems: "center",
            fontSize: 15, mr: 2
          }}
          onMouseMove={handleClick}
        >
        Products<KeyboardArrowDownIcon />
      </Typography>
      <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          { categories && categories.map((el:any, i:number) => 
          <MenuItem onClick={() => getProductCategory(el.displayName)} disableRipple key={`DesktopCategories_${el.name}${i}`}>
            
            <Link to={`/products/${el.displayName}`}>{el.displayName}</Link>
          </MenuItem>
          )}
      </StyledMenu>
    </Box>
  </div>
)};

export default Categories;
