import React, { FC } from 'react';
import styles from './NoMatch.module.scss';

interface NoMatchProps {}

const NoMatch: FC<NoMatchProps> = () => (
  <div className={styles.NoMatch} data-testid="NoMatch">
    <div>
      <h2>Get the Hell Out of Here!</h2>
      <p>
        {/* <Link to="/">Go to the home page</Link> */}
      </p>
    </div>
  </div>
);

export default NoMatch;
