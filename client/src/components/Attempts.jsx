import React, { useState } from 'react';
import { motion } from 'framer-motion';

const modalAnimation = {
  x: 0,
  opacity: '100%',
};

export default function Attempts({ attempt, margin, text, index }) {
  const bodyArray = text.split(' ');

  let style = {
    left: `${margin / 2}%`,
    width: document.getElementsByClassName('cipher-cluster')[0].offsetWidth,
  };

  if (window.innerWidth < 750) {
    style.left = '0';
    style.top = `${(margin + 5)}%`;
    style.zIndex = index;
  }

  return (
    <motion.div
      className="cipher-cluster-attempt"
      whileHover={{
        x: text.split(' ').length * 50,
        scale: 1,
        transition: { ease: 'easeOut', duration: 0.7 },
      }}
      id="attempts-container"
      style={style}
    >
      {bodyArray.map((word, i) => (
        <motion.div className={attempt[i] ? 'cipher-word-attempt-true' : 'cipher-word-attempt-false'} id={i} initial={{ x: -200, opacity: '0%' }} animate={modalAnimation} transition={{ duration: (i + 3) / 10 }}>
          <h4 id="cipher-text">
            {10 ** (word.length - 1)}
          </h4>
        </motion.div>
      ))}
    </motion.div>
  );
}
