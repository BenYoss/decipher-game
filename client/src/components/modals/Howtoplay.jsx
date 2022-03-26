/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

// Variant 1:
// const hoverAnimation = {
//   scale: 1.05,
//   backgroundColor: ['hsl(0, 61%, 0%)', 'hsl(127, 61%, 12%)'],
//   color: 'hsl(180, 61%, 100%)',
// };
// const leaveAnimation = {
//   scale: 1.0,
//   backgroundColor: ['hsl(127, 61%, 12%)', 'hsl(0, 61%, 0%)'],
//   color: 'hsl(180, 61%, 100%)',
// };

// variant 2

const hoverAnimation = {
  scale: 1.1,
  backgroundColor: ['hsl(0, 61%, 0%)', 'hsl(180, 61%, 100%)'],
  color: ['hsl(180, 61%, 100%)', 'hsl(0, 61%, 0%)'],
};
const leaveAnimation = {
  scale: 1.0,
  backgroundColor: ['hsl(180, 61%, 100%)', 'hsl(0, 61%, 0%)'],
  color: ['hsl(0, 61%, 0%)', 'hsl(180, 61%, 100%)'],
};

/**
 * @func Howtoplay is a react component for the Howtoplay modal.
 * @param {*} setSkipped props for skip state in parent component.
 */
export default function Howtoplay({ setSkipped }) {
  const [hover, onHover] = useState(false);
  return (
    <motion.div id="gameover-container" animate={modalAnimation} initial={{ opacity: '0%' }} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">How to Play</h2>
      </div>
      <div id="gameover-body">
        <h4 id="gameover-text">A cipher is an encrypted pattern of text. Try to solve this cipher...</h4>
        <h4 id="gameover-text">
          If you get it wrong 3 times, GAME OVER!
        </h4>
        <motion.button
          id="standard-btn"
          type="button"
          onMouseOver={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          animate={hover ? hoverAnimation : leaveAnimation}
          transition={{ duration: 0.15 }}
          onClick={() => setSkipped(true)}
        >
          Proceed

        </motion.button>
      </div>
    </motion.div>
  );
}

Howtoplay.propTypes = {
  setSkipped: propTypes.bool.isRequired,
};
