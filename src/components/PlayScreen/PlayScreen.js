import React from 'react';

import classes from './PlayScreen.module.scss';
import GameBoard from './GameBoard/GameBoard';
import InfoSidebar from './InfoSidebar/InforSidebar';

const PlayScreen = (props) => {
  return (
    <div className={classes.screen}>
      <div className={classes.screenContainer}>
        <GameBoard />
        <InfoSidebar />
      </div>
    </div>
  );
};

export default PlayScreen;
