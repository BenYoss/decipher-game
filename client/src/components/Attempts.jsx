import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

const modalAnimation = {
  x: 0,
  opacity: '100%',
};

export default function Attempts({
  attempt, margin, text, index, opened, ciphertext, mutation,
}) {
  let bodyArray = ciphertext.split(' ');
  let comparisonText = text;
  if (mutation.includes('r-')) {
    bodyArray = ciphertext.split(' ').reverse();
    comparisonText = text.reverse();
  }
  const style = {
    left: `${margin / 2}%`,
    width: document.getElementsByClassName('cipher-cluster')[0].offsetWidth,
    filter: opened ? 'blur(5px)' : null,
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
        x: comparisonText.split(' ').length * -50,
        scale: 1,
        transition: { ease: 'easeOut', duration: 0.7 },
      }}
      id="attempts-container"
      style={style}
    >
      {bodyArray.map((word, i) => (
        <motion.div className={attempt[i] ? 'cipher-word-attempt-true' : 'cipher-word-attempt-false'} id={i} initial={{ x: -200, opacity: '0%' }} animate={modalAnimation} transition={{ duration: (i + 3) / 10 }}>
          <h4 id="cipher-text">
            {word}
          </h4>
        </motion.div>
      ))}
    </motion.div>
  );
}

Attempts.propTypes = {
  attempt: propTypes.element.isRequired,
  margin: propTypes.number.isRequired,
  text: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  opened: propTypes.bool.isRequired,
  ciphertext: propTypes.string.isRequired,
  mutation: propTypes.string.isRequired,
};
