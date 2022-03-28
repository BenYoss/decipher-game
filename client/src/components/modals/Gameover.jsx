/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateCookies } from '../../helpers/helpers';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

export default function Gameover({ percent, finalTime }) {
  updateCookies(finalTime);
  return (
    <motion.div id="gameover-container" animate={modalAnimation} initial={{ opacity: '0%' }} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">GAME OVER</h2>
      </div>
      <div id="gameover-body">
        <span id="gameover-text">You were close, but not close enough!</span>
        <span id="gameover-level">
          {`Time:  ${finalTime && finalTime}`}
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

Gameover.propTypes = {
  percent: propTypes.number.isRequired,
  finalTime: propTypes.string.isRequired,
};
