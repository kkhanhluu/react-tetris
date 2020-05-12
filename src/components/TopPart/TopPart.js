import React from 'react';

import classes from './TopPart.module.css';
import PlayScreen from '../PlayScreen/PlayScreen';
import Title from './Title/Title';

const TopPart = (props) => {
  return (
    <div className={classes.container}>
      <PlayScreen />
      <Title />
    </div>
  );
};

export default TopPart;
