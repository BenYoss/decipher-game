import React, { useState } from 'react';
import propTypes from 'prop-types';
import { countDown, stopCount } from '../helpers/helpers';

export default function Timer({
  setFinalTime, gameover, victory, drawerOpened, levelSwapped, setLevelSwapped, disableTimer,
}) {
  const [time, setTime] = useState('00:00:00:00');
  if (!gameover && !victory && !disableTimer) {
    countDown(setTime, drawerOpened, levelSwapped, setLevelSwapped);
  }
  if (disableTimer) {
    setFinalTime('No Time');
    stopCount();
  }

  if ((gameover && !disableTimer) || (victory && !disableTimer)) {
    setFinalTime(time);
    stopCount();
  }
  return (
    <div id="timer-container">
      <h4 id="time">{!disableTimer ? time : ''}</h4>
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
  disableTimer: propTypes.bool.isRequired,
};
