import React, { FC } from 'react';
import styles from './Service.module.scss';

interface ServiceProps {}

const Service: FC<ServiceProps> = () => (
  <div className={styles.Service}>
    Service Component
  </div>
);

export default Service;
