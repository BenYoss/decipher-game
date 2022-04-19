/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateCookies, getAttemptCount } from '../../helpers/helpers';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

export default function Gameover({
  percent, finalTime, health, attempts, date,
}) {
  const attemptCount = getAttemptCount(health);
  updateCookies(date, finalTime, attemptCount, false, attempts);
  return (
    <motion.div id="gameover-container" animate={modalAnimation} initial={{ opacity: '0%' }} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">GAME OVER</h2>
      </div>
      <hr />
      <div id="gameover-body">
        <p id="gameover-text">You were close, but not close enough!</p>
        <div id="gameover-metrics-container">
          <section id="gameover-metric">
            <b id="gameover-time">Time:</b>
            <p id="gameover-time">
              <b>{finalTime && finalTime}</b>
            </p>
          </section>
          <section id="gameover-metric">
            <b id="gameover-time">Attempts:</b>
            <p id="gameover-time">
              <b>{attemptCount}</b>
            </p>
          </section>
        </div>
        <p id="gameover-text">
          Compared to other users, you are in the top
          {` ${percent}`}
          % in this challenge.
        </p>
      </div>
    </motion.div>
  );
}

Gameover.propTypes = {
  percent: propTypes.number.isRequired,
  finalTime: propTypes.string.isRequired,
  attempts: [
    {
      open: propTypes.bool.isRequired,
    },
  ],
  health: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
};
