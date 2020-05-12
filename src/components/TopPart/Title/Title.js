import React from 'react';

import classes from './Title.module.css';

const Title = (props) => {
  return (
    <div className={classes.title}>
      <span className={classes.longStripe}></span>
      <span className={classes.stripe}></span>
      <span className={classes.stripe}></span>
      <span className={classes.stripe}></span>
      <h1>Tetris game</h1>
      <span className={classes.longStripe}></span>
      <span className={classes.stripe}></span>
      <span className={classes.stripe}></span>
      <span className={classes.stripe}></span>
    </div>
  );
};

export default Title;
