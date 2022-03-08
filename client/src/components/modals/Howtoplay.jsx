/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';

const modalAnimation = {
  scale: 2,
};

export default function Howtoplay({ setSkipped }) {
  return (
    <motion.div id="gameover-container" animate={modalAnimation} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">How to Play</h2>
      </div>
      <div id="gameover-body">
        <h4 id="gameover-text">I cipher is an encypted pattern of text. Try to solve this cipher</h4>
        <h4 id="gameover-text">
          if you get it wrong 3 times, GAME OVER!
        </h4>
        <button id="standard-btn" type="button" onClick={() => setSkipped(true)}>Proceed</button>
      </div>
    </motion.div>
  );
}
