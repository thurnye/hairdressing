import React, { FC } from 'react';
import styles from './CardLayout.module.scss';

interface CardLayoutProps {}

const CardLayout: FC<CardLayoutProps> = () => (
  <div className={styles.CardLayout}>
    CardLayout Component
  </div>
);

export default CardLayout;
