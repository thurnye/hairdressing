import React, { FC } from 'react';
import styles from './Account.module.scss';

interface AccountProps {}

const Account: FC<AccountProps> = () => (
  <div className={styles.Account}>
    Account Component
  </div>
);

export default Account;
