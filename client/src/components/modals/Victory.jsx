/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

const modalAnimation = {
  scale: 2,
};

export default function Victory({ level, percent }) {
  let text = '';
  const time = 0;

  if (time === 0) {
    text = 'Wow! Inhuman solving speed!';
  }
  return (
    <motion.div id="gameover-container" animate={modalAnimation} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">Correct!</h2>
      </div>
      <div id="gameover-body">
        <h4 id="gameover-text">{text}</h4>
        <h3 id="gameover-level">
          Level:
          {level}
        </h3>
        <h4 id="gameover-text2">
          Compared to other users, you are in the top
          {` ${percent}`}
          % in this challenge.
        </h4>
      </div>
    </motion.div>
  );
}

Victory.propTypes = {
  level: propTypes.string.isRequired,
  percent: propTypes.number.isRequired,
};
