import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import propTypes from 'prop-types';
import encouragingWordsList from './encouragingWords.json';

const textAnimationIn = {
  y: 50,
  opacity: '100%',
};
const textAnimationOut = {
  y: 100,
  opacity: '0%',
};

let sentence = '';

export default function RewardingEncouragement({
  attempts, gameover, encouragement, setEncouragement,
}) {
  if (!encouragement) {
    sentence = '';
  } else {
    let encouragingWords = [];
    if (sentence.length < 1) {
      if (gameover) {
        encouragingWords = encouragingWordsList[4].values;
      } else {
        encouragingWordsList.forEach((value) => {
          if ((attempts.length === value.attempts) && !gameover) {
            encouragingWords = value.values;
          }
        });
      }
      sentence = encouragingWords[Math.floor(Math.random() * encouragingWords.length)];
      setTimeout(() => {
        setEncouragement(false);
      }, 1000);
    }
  }
  const transitionDuration = sentence.split(' ').length;
  return (
    <AnimatePresence>
      { encouragement && (
      <motion.div id="encouraging-text-container" initial={{ y: 0, opacity: '0%' }} exit={textAnimationOut} animate={textAnimationIn} transition={{ duration: (transitionDuration + 3) / 10 }}>
        <span>{sentence}</span>
      </motion.div>
      )}
    </AnimatePresence>
  );
}

RewardingEncouragement.propTypes = {
  attempts: propTypes.element.isRequired,
  gameover: propTypes.bool.isRequired,
  encouragement: propTypes.bool.isRequired,
  setEncouragement: propTypes.func.isRequired,
};
