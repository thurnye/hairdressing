import React, { FC } from 'react';
import NavBar from '../NavBar/NavBar'
import BoxLayout from '../layout/BoxLayout/BoxLayout';
import styles from './Header.module.scss';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <div className={styles.Header}>
    <NavBar/>
  </div>
);

export default Header;
