import React from 'react';

import classes from './Title.module.scss';

const Title = (props) => {
  return (
    <React.Fragment>
      <h1 className={classes.title}>Tetris Game</h1>
      <div className={classes.titleContainer}>
        <span className={classes.longStripe}></span>
        <span className={classes.stripe}></span>
        <span className={classes.stripe}></span>
        <span className={classes.stripe}></span>
        <span className={classes.stripe}></span>
        <span className={classes.centerSpace}></span>
        <span className={classes.stripe}></span>
        <span className={classes.stripe}></span>
        <span className={classes.stripe}></span>
        <span className={classes.stripe}></span>
        <span className={classes.longStripe}></span>
      </div>
    </React.Fragment>
  );
};

export default Title;
