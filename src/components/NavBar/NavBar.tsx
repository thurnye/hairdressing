import React, { FC , useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import styles from './NavBar.module.scss';
import { Link } from "react-router-dom";
import {getSearchText} from '../../store/searchSlice'
import {getActiveComponent, activeComponentSelector} from '../../store/categorySlice'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ShoppingBag } from '@mui/icons-material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Categories from './Categories/Categories';
import { TextField } from '@mui/material';
import AccountNav from './AccountNav/AccountNav';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
    },
  },
}));


interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const active= useSelector(activeComponentSelector)
  const [search, setSearch] = useState<any>('')
  const nav:any = [
    {name: 'Home', path: '/', category: false},
    {name: 'Products', path: '/products', category: true},
    {name: 'Services', path: '/services', category: false},
    {name: 'Book Online', path: '/book-online', category: false},
    {name: 'Contacts', path: '/contact', category: false},
  ]

  const ListStyle = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const toggleDrawer =
    (val:boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState(val);
    };

    const setActiveNav = (name:string) => {
      dispatch(getActiveComponent(name))
      setState(false);
    }

   const closeToggleDrawer = (e:boolean) => {
    setState(false)
  }

  const searchField = () => {
    if(search.trim()){
      console.log('Nav',search)
      dispatch(getSearchText(search))
      navigate(`/products/search/${search}`);
    }
  }

   

  
  // const menuId = 'primary-search-account-menu';
  return(
  <div className={styles.NavBar}>
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{boxShadow: 'none'}}>
        <Toolbar>
          <Box sx={{ display: { xs: 'flex', sm: 'none' },justifyContent:'center', alignItems: 'center', mr: 2}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              
              <MenuIcon className={styles.icons} />
            </IconButton>
        <SwipeableDrawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        >
          <Box
          sx={{ width: 250, mt: 7 }}
          role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ListStyle>
                  <List >
                   { nav.map((el:any, i:number) => {
                    const {category} = el
                    return (<React.Fragment key={`MobileView_${el.name}${i}`}>
                    {category ? <Categories closeToggleDrawer={closeToggleDrawer} active={active} component={el.name}/> :
                   <ListItem>
                        <ListItemText onClick={() => setActiveNav(el.name)} >
                        <Link to={el.path} className={active === el.name ? styles.activeComponent : ''}>{el.name}</Link>
                          </ListItemText>
                      </ListItem>}
                    </React.Fragment>
                    )
                    })}
                  </List>
                </ListStyle>
              </Grid>
            </Grid>
          </Box>
        </SwipeableDrawer>
        {/* //toggle ends */}

            <SearchIcon 
            sx={{ display: { xs: '', sm: 'none' }}}
            onClick={() => setOpenSearch(!openSearch)}
            className={styles.icons}
            />
          </Box>
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{fontSize: '25px'}}
            >
              <Link to="/" className={styles.logo} >Toronto Styles</Link>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex'}}>
          <Box
                component="form"
                sx={{ p: '2px 4px', 
                alignItems: 'center', 
                width: 400,
                border: '2px dotted red',
                display: { xs: 'none', sm: 'flex' }
              }}
              className={styles.searchToggle}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="search..."
                  inputProps={{ 'aria-label': 'Search Products' }}
                  onChange = {(e) => setSearch(e.target.value)}
                />
                <IconButton 
                disableRipple
                type="button" 
                onClick = {() => searchField()}
                sx={{ p: '10px', 
                color: 'black', 
                height: '100%',
                borderLeft: '2px solid #ccca',
                borderRadius: 0,
                width: '60px'
                }} aria-label="search">
                  <SearchIcon />
                </IconButton>
            </Box>
          <Box sx={{ display: 'flex'}}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
              <Link to="/cart" className={styles.logo} >
                <ShoppingBag className={styles.icons}/>
              </Link>
              </Badge>
            </IconButton>
            <AccountNav/>
          </Box>
          </Box>
        </Toolbar>

        <Box>
          {/* <Search 
          sx={{ display: { xs: openSearch ? 'flex' : 'none', sm: 'none' }}} 
          className={styles.searchToggle}
          onChange= {(e:any) => setSearch(e.target.value)}
          >
            <SearchIconWrapper>
              <SearchIcon className={styles.icons}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search???"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          </Box>

          <Box
                component="form"
                sx={{ p: '2px 4px', 
                alignItems: 'center', 
                // width: ,
                border: '2px dotted red',
                display: { xs: openSearch ? 'flex' : 'none', sm: 'none' }
                
              }}

          className={styles.searchToggle}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="search..."
                  inputProps={{ 'aria-label': 'Search Products' }}
                  onChange = {(e) => setSearch(e.target.value)}
                />
                <IconButton 
                disableRipple
                type="button" 
                onClick = {() => searchField()}
                sx={{ p: '10px', 
                color: 'black', 
                height: '100%',
                borderLeft: '2px solid #ccca',
                borderRadius: 0,
                width: '60px'
                }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Box>
      </AppBar>
    </Box>
    <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', alignItems: 'center'}} className={styles.desktopNavigation}>
        {nav.map((el:any, i:number) => {
          const {category} = el
          return(<React.Fragment key={`DesktopView_${el.name}${i}`}>
            {category ? <Categories closeToggleDrawer={closeToggleDrawer} active={active} component={el.name}/> :
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{ fontSize: 15, fontWeight: '900', mr: 4}}
              onClick={() => setActiveNav(el.name)}
              className={active === el.name ? styles.activeComponent : ''}
            >
              <Link to={el.path}>{el.name}</Link>
            </Typography>}
          </React.Fragment>
          )})}
    </Box>
  </div>
)};

export default NavBar;
