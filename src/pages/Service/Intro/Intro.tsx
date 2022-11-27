import React, { FC } from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, Typography } from '@mui/material';
import styles from './Intro.module.scss';
import { fontFamily } from '@mui/system';

interface IntroProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: 'PT Sans !important',
    fontWeight: 'lighter',
  }
}))
const Intro: FC<IntroProps> = () => {
  const classes = useStyles();
  return(
  <Box className={styles.Intro} sx={{mb: 8}}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={10} sm={8} md={6}>
        <Typography gutterBottom sx={{fontSize: 19, ml: 2, mt: 7}} className={classes.root}>
        SINCE 1990, The Toronto style hair salon has committed to the highest level of quality in the salon industry. We are locally owned and grown in Canada.
        </Typography>
        <Box sx={{mt: 1, display: 'flex'}}>
        <Button 
        type="submit" 
        variant="contained" 
        className={`buttonStyles`}
        sx={{
          fontSize: 18
        }}
        >BOOK ONLINE</Button>
      </Box>
      </Grid>
    </Grid>
  </Box>
);
}
export default Intro;
