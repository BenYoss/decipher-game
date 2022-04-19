import React, { useState } from 'react';
import propTypes from 'prop-types';
import { countDown, stopCount } from '../helpers/helpers';

export default function Timer({
  setFinalTime, gameover, victory, drawerOpened, levelSwapped, setLevelSwapped,
}) {
  const [time, setTime] = useState('00:00:00:00');
  if (!gameover && !victory) {
    countDown(setTime, drawerOpened, levelSwapped, setLevelSwapped);
  }
  if (gameover || victory) {
    setFinalTime(time);
    stopCount();
  }
  return (
    <div id="timer-container">
      <h4 id="time">{time}</h4>
    </div>
  );
}

Timer.propTypes = {
  gameover: propTypes.bool.isRequired,
  victory: propTypes.bool.isRequired,
  setFinalTime: propTypes.func.isRequired,
  drawerOpened: propTypes.func.isRequired,
  setLevelSwapped: propTypes.func.isRequired,
  levelSwapped: propTypes.bool.isRequired,
};
