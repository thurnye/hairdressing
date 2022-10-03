import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styles from './TextStyle.module.scss';

interface TextStyleProps {
  text?: string
  // sx?: any
  className?: string 
}

const TextStyle: FC<TextStyleProps> = (props: TextStyleProps) => {
  const {text, className}  = props
  
  return(
  <div className={styles.TextStyle}>
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{mt:4 , mb:4}}
      className={className}
    >
      {text}
    </Typography>
  </div>
);}

export default TextStyle;
