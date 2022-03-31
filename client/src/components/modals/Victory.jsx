/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateCookies, getAttemptCount } from '../../helpers/helpers';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

export default function Victory({ percent, time, attempts }) {
  let text = '';
  const times = time.split(':');
  const sec = Number(times[2]);
  const min = Number(times[1]);
  if (sec < 30) {
    text = 'Wow! Inhuman solving speed!';
  } else if (min < 2) {
    text = 'Pretty fast!';
  } else if (min < 5) {
    text = 'Average time!';
  } else if (min < 10) {
    text = 'Pretty slow';
  }

  const attemptCount = getAttemptCount(attempts);

  updateCookies(time, attemptCount, true);
  return (
    <motion.div id="gameover-container" animate={modalAnimation} initial={{ opacity: '0%' }} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">Correct!</h2>
      </div>
      <hr />
      <div id="gameover-body">
        <span id="gameover-text">{text}</span>
        <div id="gameover-metrics-container">
          <section id="gameover-metric">
            <b id="gameover-time">Time:</b>
            <p id="gameover-time">
              <b>{time && time}</b>
            </p>
          </section>
          <section id="gameover-metric">
            <b id="gameover-time">Attempts:</b>
            <p id="gameover-time">
              <b>{attemptCount}</b>
            </p>
          </section>
        </div>
        <span id="gameover-text">
          Compared to other users, you are in the top
          {` ${percent}`}
          % in this challenge.
        </span>
      </div>
    </motion.div>
  );
}

Victory.propTypes = {
  percent: propTypes.number.isRequired,
  time: propTypes.string.isRequired,
  attempts: [
    {
      open: propTypes.bool.isRequired,
    },
  ],
};
