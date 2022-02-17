import React from 'react';
import propTypes from 'prop-types';
import { mutate } from '../helpers/helpers';

export default function Cipher({ text, level }) {
  let body = text;
  if (text) {
    for (let i = 0; i < text.length; i += 1) {
      if (text[i] === '.' || text[i] === '!' || text[i] === '?' || text[i] === ',') {
        body = body.replace(text[i], ` ${text[i]}`);
      }
    }
  }
  body = mutate(text, level);
  const bodyArray = body.split(' ');
  return (
    <div id="cipher-cluster">
      {text.length ? (
        bodyArray.map((word) => (
          <div id="cipher-word">
            <h4 id="cipher-text">
              {word}
            </h4>
          </div>
        ))) : (
          <div id="no-cipher">
            <h4>Congrats!</h4>
            <h6>You have completed all of the available ciphers for today!</h6>
            <h6>Stay tuned for more ciphers tomorrow!</h6>
          </div>
      )}
    </div>
  );
}

Cipher.propTypes = {
  text: propTypes.string.isRequired,
  level: propTypes.number.isRequired,
};
