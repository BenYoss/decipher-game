import React from 'react';
import propTypes from 'prop-types';
import { motion } from 'framer-motion';
import { flipLetters, reverseText, addMoreText } from '../helpers/helpers';

const modalAnimation = {
  x: 0,
  opacity: '100%',
};

export default function Cipher({ text, mutation }) {
  let body = text;
  if (text) {
    for (let i = 0; i < text.length; i += 1) {
      if (text[i] === '.' || text[i] === '!' || text[i] === '?' || text[i] === ',') {
        body = body.replace(text[i], ` ${text[i]}`);
      }
    }
  }
  if (mutation) {
    if (mutation.includes('s-')) {
      const mutationVals = mutation.split('-');
      body = flipLetters(text, mutationVals[1][0], mutationVals[1][1]);
    }
    if (mutation.includes('r-')) {
      body = reverseText(text);
    }
    if (mutation.includes('a-')) {
      const mutationVals = mutation.split('-');
      body = addMoreText(text, mutationVals[1][0], mutationVals[1][1], mutationVals[1][2]);
    }
  }
  const bodyArray = body.split(' ');
  return (
    <div id="cipher-cluster">
      {text.length ? (
        bodyArray.map((word, i) => (
          <motion.div id="cipher-word" initial={{ x: -200, opacity: '0%' }} animate={modalAnimation} transition={{ duration: (i + 1) / 10 }}>
            <h4 id="cipher-text">
              {word}
            </h4>
          </motion.div>
        ))) : (
          <div id="no-cipher">
            <h4>Congrats!</h4>
            <h6>You have completed todays Cipher!</h6>
            <h6>Stay tuned for more ciphers tomorrow!</h6>
          </div>
      )}
    </div>
  );
}

Cipher.propTypes = {
  text: propTypes.string.isRequired,
  mutation: propTypes.string.isRequired,
};
