import React from 'react';
import propTypes from 'prop-types';
import { motion } from 'framer-motion';
import { flipLetters, reverseText, addMoreText } from '../helpers/helpers';

const modalAnimation = {
  x: 0,
  opacity: '100%',
};

export default function Cipher({
  text, mutation, opened, setCiphertext,
}) {
  let body = text;
  if (text) {
    for (let i = 0; i < text.length; i += 1) {
      if (text[i] === '.' || text[i] === '!' || text[i] === '?' || text[i] === ',') {
        body = body.replace(text[i], ` ${text[i]}`);
      }
    }
  }
  if (mutation) {
    const mutations = mutation.split('|');
    if (mutations[0].includes('s-')) {
      const mutationVals = mutations[0].split('-');
      body = flipLetters(text, mutationVals[1][0], mutationVals[1][1]);
    }
    if (mutations[0].includes('r-')) {
      body = reverseText(text);
    }
    if (mutations[0].includes('a-')) {
      const mutationVals = mutations[0].split('-');
      body = addMoreText(text, mutationVals[1][0], mutationVals[1][1], mutationVals[1][2]);
    }
    mutations.forEach((mutate, i) => {
      if (mutations[i + 1]) {
        if (mutations[i + 1].includes('s-')) {
          const mutationVals = mutations[i + 1].split('-');
          body = flipLetters(body, mutationVals[1][0], mutationVals[1][1]);
        }
        if (mutations[i + 1].includes('r-')) {
          body = reverseText(body);
        }
        if (mutations[i + 1].includes('a-')) {
          const mutationVals = mutations[i + 1].split('-');
          body = addMoreText(body, mutationVals[1][0], mutationVals[1][1], mutationVals[1][2]);
        }
      }
    });
  }
  const bodyArray = body.split(' ');
  setCiphertext(body);
  const blurredWords = {
    filter: 'blur(6px)',
  };
  return (
    <div className="cipher-cluster" style={opened ? blurredWords : {}}>
      {text.length ? (
        bodyArray.map((word, i) => (
          <motion.div id="cipher-word" initial={{ x: -200, opacity: '0%' }} animate={modalAnimation} transition={{ duration: (i + 3) / 10 }}>
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
  opened: propTypes.bool.isRequired,
  setCiphertext: propTypes.func.isRequired,
};
