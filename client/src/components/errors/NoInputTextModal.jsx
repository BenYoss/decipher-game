import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../../styles/errorModal.scss';
import propTypes from 'prop-types';

const textAnimationIn = {
  y: 50,
  opacity: '100%',
};
const textAnimationOut = {
  y: 100,
  opacity: '0%',
};

const sentence = 'Please enter some text first!';
const transitionDuration = sentence.split(' ').length;

export default function NoInputTextModal({ setError }) {
  const [render, setRender] = useState(true);
  setTimeout(() => {
    setRender(false);
  }, 1500);
  setTimeout(() => {
    setError({ type: '' });
  }, 2000);
  return (
    <AnimatePresence>
      {
        render && (
          <motion.div id="error-text-container" initial={{ y: 0, opacity: '0%' }} exit={textAnimationOut} animate={textAnimationIn} transition={{ duration: (transitionDuration) / 10 }}>
            <div id="error-inner-div">
              <span>{sentence}</span>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  );
}

NoInputTextModal.propTypes = {
  setError: propTypes.func.isRequired,
};
