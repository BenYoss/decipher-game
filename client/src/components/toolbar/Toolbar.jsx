/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

import Settings from './Settings';
import Statistics from './Statistics';
import LevelSelection from './LevelSelection';
import Donate from './Donate';

import settingsIcon from '../../img/settings-icon.png';
import statisticsIcon from '../../img/statistics-icon.png';
import cipherListIcon from './level-selection.svg';
import coffeeIcon from './coffee.svg';

export default function Toolbar({
  setDrawerOpened,
  ciphers,
  setReload,
  thisWeeksCiphers,
  setText,
  setLevel,
  setMutation,
  setLevelSwapped,
  setDate,
  setPlayed,
  date,
  setHealth,
  setAttempts,
  skipped,
  downloadURL,
  setDownloadURL,
  setSkipped,
  setDisableTimer,
  setGameover,
  setVictory,
  setHardMode,
}) {
  const [drawerType, handleDrawer] = useState(-1);
  const drawerAnimation = {
    x: window.innerWidth > 750 ? '21vw' : '105vw',
  };

  const retractAnimation = {
    x: 0,
  };

  const drawerHandler = (index) => {
    handleDrawer(index);
  };

  return (
    <motion.div id="toolbar-container" animate={drawerType > -1 ? drawerAnimation : retractAnimation} transition={{ duration: 0.4, bounce: 10 }}>
      <div className="toolbar-item" onClick={() => { drawerHandler(0); setDrawerOpened(true); }}>
        <img src={settingsIcon} alt="settings icon" className="toolbar-icon-img" id="toolbar-icon-settings" />
      </div>
      <div className="toolbar-item" onClick={() => { drawerHandler(1); setDrawerOpened(true); }}>
        <img src={statisticsIcon} alt="statistics icon" className="toolbar-icon-img" id="toolbar-icon-statistics" />
      </div>
      <div className="toolbar-item" onClick={() => { drawerHandler(2); setDrawerOpened(true); }}>
        <img src={cipherListIcon} alt="cipher list icon" className="toolbar-icon-img" id="toolbar-icon-cipher-list" />
      </div>
      <div
        className="toolbar-item"
        onClick={() => { drawerHandler(3); setDrawerOpened(true); }}
      >
        <img src={coffeeIcon} alt="donation icon" style={{ marginLeft: '4px' }} className="toolbar-icon-img" id="toolbar-icon-donation" />
      </div>
      <div id="toolbar-drawer">
        <div id="exit-btn-container">
          <button type="button" onClick={() => { drawerHandler(-1); setDrawerOpened(false); }} className="btn-exit">X</button>
        </div>
        {drawerType === 2 && (
          <LevelSelection
            ciphers={ciphers}
            setReload={setReload}
            thisWeeksCiphers={thisWeeksCiphers}
            setText={setText}
            setLevel={setLevel}
            setMutation={setMutation}
            setLevelSwapped={setLevelSwapped}
            setDate={setDate}
            setPlayed={setPlayed}
            date={date}
            setHealth={setHealth}
            setAttempts={setAttempts}
            skipped={skipped}
            setDownloadURL={setDownloadURL}
            downloadURL={downloadURL}
            setSkipped={setSkipped}
            setGameover={setGameover}
            setVictory={setVictory}
          />
        )}
        {drawerType === 1 && (
          <Statistics ciphers={ciphers} setReload={setReload} />
        )}
        {drawerType === 0 && (
          <Settings
            setDisableTimer={setDisableTimer}
            setReload={setReload}
            setHardMode={setHardMode}
          />
        )}
        {drawerType === 3 && (
          <Donate setDisableTimer={setDisableTimer} setReload={setReload} />
        )}
      </div>
    </motion.div>
  );
}

Toolbar.propTypes = {
  setDrawerOpened: propTypes.func.isRequired,
  ciphers: propTypes.element.isRequired,
  date: propTypes.string.isRequired,
  setLevel: propTypes.func.isRequired,
  setHealth: propTypes.func.isRequired,
  thisWeeksCiphers: propTypes.element.isRequired,
  setReload: propTypes.func.isRequired,
  setText: propTypes.func.isRequired,
  setMutation: propTypes.func.isRequired,
  setDate: propTypes.func.isRequired,
  setPlayed: propTypes.func.isRequired,
  setAttempts: propTypes.func.isRequired,
  setLevelSwapped: propTypes.func.isRequired,
  skipped: propTypes.bool.isRequired,
  downloadURL: propTypes.string.isRequired,
  setDownloadURL: propTypes.func.isRequired,
  setVictory: propTypes.func.isRequired,
  setGameover: propTypes.func.isRequired,
  setSkipped: propTypes.func.isRequired,
  setDisableTimer: propTypes.func.isRequired,
  setHardMode: propTypes.func.isRequired,
};
