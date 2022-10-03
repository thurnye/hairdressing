import React, { FC } from 'react';
import Box from '@mui/material/Box';
import styles from './BoxLayout.module.scss';

interface BoxLayoutProps {
  children: any
  className?: string
  sx?:any
}

const BoxLayout: FC<BoxLayoutProps> = (props:BoxLayoutProps) => (
  <Box className={`${styles.BoxLayout} ${props.className}`} sx={props.sx}>
    {props.children}
  </Box>
);

export default BoxLayout;