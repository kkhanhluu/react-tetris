import React from 'react';

import classes from './Gameboy.module.css';
import TopPart from '../TopPart/TopPart';

const Gameboy = (props) => {
  return (
    <div className={classes.container}>
      <TopPart />
    </div>
  );
};

export default Gameboy;
