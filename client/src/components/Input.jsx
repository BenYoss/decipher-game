import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateAttempts } from '../helpers/helpers';

export default function Input({
  text, level, health, setHealth, setGameover, setPercent,
  percent, setVictory, setAttempts, attempts,
}) {
  const hoverAnimation = {
    scale: 1.1,
    boxShadow: '0px 0px 8px hsl(120, 61%, 50%)',
  };
  const leaveAnimation = {
    scale: 1.0,
    boxShadow: '0px 0px 0px hsl(120, 61%, 50%)',
  };
  const [hover, onHover] = useState(false);
  const [val, useVal] = useState('');
  return (
    <div id="cipher-input-container">
      <form>
        <textarea onChange={(e) => useVal(e.target.value)} />
        <div id="input-btn-container">
          <motion.button
            onMouseOver={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            animate={hover ? hoverAnimation : leaveAnimation}
            transition={{ duration: 0.15 }}
            id="standard-btn"
            type="button"
            onClick={() => {
              if (val === text) {
                const initialColor = document.getElementsByTagName('textarea')[0].style.color;
                document.getElementsByTagName('textarea')[0].style.color = 'lime';
                document.getElementsByTagName('textarea')[0].style.border = 'lime';
                setPercent(percent / level);
                setTimeout(() => {
                  document.getElementsByTagName('textarea')[0].style.color = initialColor;
                  document.getElementsByTagName('textarea')[0].style.border = initialColor;
                  document.getElementsByTagName('textarea')[0].value = '';
                }, 1000);
                updateAttempts(val, text).then((data) => {
                  setAttempts([...attempts, data]);
                  setVictory(true);
                });
              } else {
                const initialColor = document.getElementsByTagName('textarea')[0].style.color;
                document.getElementsByTagName('textarea')[0].style.color = 'red';
                document.getElementsByTagName('textarea')[0].style.border = 'red';
                let hasTakenSlot = false;
                let tally = 0;
                updateAttempts(val, text)
                  .then((data) => {
                    setAttempts([...attempts, data]);
                  });
                setTimeout(() => {
                  document.getElementsByTagName('textarea')[0].style.color = initialColor;
                  document.getElementsByTagName('textarea')[0].style.border = initialColor;
                  document.getElementsByTagName('textarea')[0].value = '';
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
                  if (tally === 4) {
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
