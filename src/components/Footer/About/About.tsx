import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './About.module.scss';
import e from 'express';


interface AboutProps {}

const About: FC<AboutProps> = () => {
  const desktop = [
    {name:'Search', path: '/products'},
    {name:'About Us', path: '/about-us'},
    {name:'Contact', path: '/contact'},
    {name:'Policy', path: '/policy'},
    {name:'Shipping & Returns', path: '/shipping-and-returns'}
  ];

  const mobile = [
    {name:'Support', others:desktop},
    {name:'Account', others:[{name:'My-Account',path: '/my-account' }]},
    {name:'Information', others:[{name:'FAQ', path: '/info', }]},
  ]
  
  return(
  <div className={styles.About}>
    <Typography variant="h5" gutterBottom sx={{textAlign: 'start', mt: 1}}>
        About
      </Typography>
      {/* Desktop */}
      <Box sx={{ flexGrow: 1, textAlign: 'start', display: { xs: 'none', sm: 'none',  md: 'block' } }}>
            <List dense={true} sx={{pt:0}}>
              {desktop.map((el:any) => 
              <ListItem  key={el.name} sx={{p:0}}>
                <ListItemText>
                <Link to={el.path}>{el.name}</Link>
                  </ListItemText>
              </ListItem>)}
            </List>
    </Box>

    {/* Mobile  */}
    <Box sx={{ flexGrow: 1, textAlign: 'start', display: { xs: 'block', sm: 'block',  md: 'none' },     width: 'calc(100vw - 35px) '}}>
      {mobile.map((el:any) => 
        <Accordion sx={{boxShadow: 'none'}}> 
          <AccordionSummary
           sx={{backgroundColor: 'none', p:0}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ml:2}}>{el.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{
              // width:'calc(10vw - 64px)'
            }}>
              <List dense={true} sx={{pt:0}}>
              {el.others.map((el:any) => 
              <ListItem  key={el.name} sx={{p:0}}>
                <ListItemText>
                <Link to={el.path}>{el.name}</Link>
                  </ListItemText>
              </ListItem>)}
            </List>
            </Box>
          </AccordionDetails>
      </Accordion>
    )}
    </Box>

  </div>
)};

export default About;
