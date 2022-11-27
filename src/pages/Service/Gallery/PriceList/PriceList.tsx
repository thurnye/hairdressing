import React, { FC } from 'react';
import styles from './PriceList.module.scss';

interface PriceListProps {}

const PriceList: FC<PriceListProps> = () => (
  <div className={styles.PriceList}>
    PriceList Component
  </div>
);

export default PriceList;
