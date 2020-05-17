import React from 'react';

import classes from './InfoSidebar.module.scss';
import Cipher from './Cipher/Cipher';

const InfoSidebar = (props) => {
  return (
    <div className={classes.infoSidebar}>
      <div className={classes.infoContainer}>
        <h2>Score</h2>
        <div className={classes.info}>
          <Cipher />
          <Cipher />
          <Cipher />
          <Cipher />
          <Cipher />
          <Cipher />
        </div>
      </div>

      <div className={classes.infoContainer}>
        <h2>Stage</h2>
        <div className={classes.info}>
          <Cipher />
          <Cipher />
          <Cipher />
          <Cipher />
          <Cipher />
          <Cipher />
        </div>
      </div>

      <div className={classes.infoContainer}>
        <h2>Speed</h2>
        <div className={classes.info}>
          <Cipher />
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar;
