import React, { FC } from 'react';
import styles from './Product.module.scss';

interface ProductProps {}

const Product: FC<ProductProps> = () => (
  <div className={styles.Product}>
    Product Component
  </div>
);

export default Product;
