/* eslint-disable prefer-regex-literals */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateAttempts } from '../helpers/helpers';

export default function Input({
  text, level, health, setHealth, setGameover, setPercent,
  percent, setVictory, setAttempts, attempts, setError,
}) {
  // Animation objects.
  const hoverAnimation = {
    scale: 1.1,
    boxShadow: '0px 0px 8px hsl(120, 61%, 50%)',
  };
  const leaveAnimation = {
    scale: 1.0,
    boxShadow: '0px 0px 0px hsl(120, 61%, 50%)',
  };
  // Stateful components.
  const [hover, onHover] = useState(false);
  const [val, useVal] = useState('');

  return (
    <div id="cipher-input-container">
      <form>
        <textarea
          onChange={(e) => {
            const pattern = / /g;
            const splitted = text.split(' ');
            if (!e.target.value.match(pattern)
            || e.target.value.match(pattern).length < splitted.length) {
              useVal(e.target.value);
            }
          }}
          value={val}
        />
        <div id="input-btn-container">
          <motion.button
            onMouseOver={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            animate={hover ? hoverAnimation : leaveAnimation}
            transition={{ duration: 0.15 }}
            id="standard-btn"
            type="button"
            onClick={() => {
              const value = val;
              // Checks if text was entered into the response. If not, an error will return.
              if (value.length < 1) {
                setError({ type: 'no input text' });
                return;
              }
              // Removes all symbols from input text and answer text for comparison.
              const regexLower = new RegExp(/[a-z]|[A-Z]| /i, 'g');
              const newText = text.match(regexLower).join('');
              const newValue = value.match(regexLower).join('');
              // If text is right, the text will display it's correct.
              if (newValue === newText) {
                const initialColor = document.getElementsByTagName('textarea')[0].style.color;
                document.getElementsByTagName('textarea')[0].style.color = 'lime';
                document.getElementsByTagName('textarea')[0].style.border = 'lime';
                setPercent(percent / level);
                setTimeout(() => {
                  document.getElementsByTagName('textarea')[0].style.color = initialColor;
                  document.getElementsByTagName('textarea')[0].style.border = initialColor;
                  document.getElementsByTagName('textarea')[0].value = '';
                }, 1000);
                updateAttempts(newValue, newText).then((data) => {
                  setAttempts([...attempts, data]);
                  setVictory(true);
                });
              } else {
                // If the input text is wrong, the input box will flash red with a used attempt.
                const initialColor = document.getElementsByTagName('textarea')[0].style.color;
                document.getElementsByTagName('textarea')[0].style.color = 'red';
                document.getElementsByTagName('textarea')[0].style.border = 'red';
                let hasTakenSlot = false;
                let tally = 0;
                updateAttempts(newValue, newText)
                  .then((data) => {
                    setAttempts([...attempts, data]);
                  });
                setTimeout(() => {
                  document.getElementsByTagName('textarea')[0].style.color = initialColor;
                  document.getElementsByTagName('textarea')[0].style.border = initialColor;
                }, 1000);
                const updatedHealth = health.map((slot) => {
                  if (slot.open && !hasTakenSlot) {
                    hasTakenSlot = true;
                    return { open: false };
                  }
                  return slot;
                });
                updatedHealth.forEach((slot) => {
                  if (!slot.open) {
                    tally += 1;
                  }
                  // If all 4 attempts are used... GAMEOVER.
                  if (tally === 4) {
                    document.getElementById('standard-btn').style.pointerEvents = 'none';
                    document.getElementsByTagName('textarea')[0].value = '';
                    document.getElementsByTagName('textarea')[0].style.color = initialColor;
                    document.getElementsByTagName('textarea')[0].style.border = initialColor;
                    useVal('');
                    setGameover(true);
                  }
                });
                setHealth(updatedHealth);
              }
            }}
          >
            Submit

          </motion.button>
        </div>
      </form>
    </div>
  );
}

Input.propTypes = {
  text: propTypes.string.isRequired,
  level: propTypes.string.isRequired,
  health: propTypes.element.isRequired,
  setHealth: propTypes.func.isRequired,
  setGameover: propTypes.func.isRequired,
  setPercent: propTypes.func.isRequired,
  percent: propTypes.number.isRequired,
  setVictory: propTypes.func.isRequired,
  setAttempts: propTypes.func.isRequired,
  attempts: propTypes.element.isRequired,
};
