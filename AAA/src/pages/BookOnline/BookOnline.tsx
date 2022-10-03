import React, { FC } from 'react';
import styles from './BookOnline.module.scss';

interface BookOnlineProps {}

const BookOnline: FC<BookOnlineProps> = () => (
  <div className={styles.BookOnline}>
    BookOnline Component
  </div>
);

export default BookOnline;
