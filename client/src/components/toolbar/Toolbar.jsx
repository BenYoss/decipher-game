/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

import Settings from './Settings';
import Statistics from './Statistics';

import settingsIcon from '../../img/settings-icon.png';
import statisticsIcon from '../../img/statistics-icon.png';

export default function Toolbar({ setDrawerOpened }) {
  const [drawerType, handleDrawer] = useState(-1);
  const drawerAnimation = {
    x: window.innerWidth > 750 ? 410 : 410,
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
      <div id="toolbar-drawer">
        <div id="exit-btn-container">
          <button type="button" onClick={() => { drawerHandler(-1); setDrawerOpened(false); }} className="btn-exit">X</button>
        </div>
        {drawerType === 1 && (
          <Statistics />
        )}
        {drawerType === 0 && (
          <Settings />
        )}
      </div>
    </motion.div>
  );
}

Toolbar.propTypes = {
  setDrawerOpened: propTypes.func.isRequired,
};
