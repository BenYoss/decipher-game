/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateCookies } from '../../helpers/helpers';

const modalAnimation = {
  scale: 2,
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
    <motion.div id="gameover-container" animate={modalAnimation} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">Correct!</h2>
      </div>
      <div id="gameover-body">
        <h4 id="gameover-text">{text}</h4>
        <h4 id="gameover-level">
          {`Time:  ${time && time}`}
        </h4>
        <h4 id="gameover-text">
          Compared to other users, you are in the top
          {` ${percent}`}
          % in this challenge.
        </h4>
      </div>
    </motion.div>
  );
}

Victory.propTypes = {
  percent: propTypes.number.isRequired,
  time: propTypes.string.isRequired,
};
