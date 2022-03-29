/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateCookies } from '../../helpers/helpers';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

export default function Victory({ percent, time }) {
  let text = '';
  const times = time.split(':');
  const sec = Number(times[2]);
  if (sec < 5) {
    text = 'Wow! Inhuman solving speed!';
  } else if (sec < 7) {
    text = 'Pretty fast!';
  } else if (sec < 10) {
    text = 'Average time!';
  } else if (sec < 15) {
    text = 'Pretty slow';
  }
  updateCookies(time);

  return (
    <motion.div id="gameover-container" animate={modalAnimation} initial={{ opacity: '0%' }} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">Correct!</h2>
      </div>
      <hr />
      <div id="gameover-body">
        <span id="gameover-text">{text}</span>
        <span id="gameover-level">
          {`Time:  ${time && time}`}
        </span>
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
};
