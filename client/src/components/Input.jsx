import React, { useState } from 'react';
import propTypes from 'prop-types';

export default function Input({
  text, level, health, setHealth, setGameover, setPercent, percent, setVictory,
}) {
  const [val, useVal] = useState('');
  return (
    <div id="cipher-input-container">
      <form>
        <textarea onChange={(e) => useVal(e.target.value)} />
        <button
          id="standard-btn"
          type="button"
          onClick={() => {
            if (val === text) {
              document.getElementsByTagName('textarea')[0].style.color = 'lime';
              document.getElementsByTagName('textarea')[0].style.border = 'lime';
              setPercent(percent / level);
              setTimeout(() => {
                document.getElementsByTagName('textarea')[0].style.color = 'black';
                document.getElementsByTagName('textarea')[0].style.border = 'black';
                document.getElementsByTagName('textarea')[0].value = '';
              }, 1000);
              document.getElementById('standard-btn').disabled = true;
              document.getElementById('standard-btn').style.backgroundColor = 'gray';
              document.getElementById('standard-btn').style.border = 'rgb(181, 181, 181)';
              document.getElementById('standard-btn').style.color = 'white';
              document.getElementById('standard-btn').textContent = '🔒';
              setVictory(true);
            } else {
              document.getElementsByTagName('textarea')[0].style.color = 'red';
              document.getElementsByTagName('textarea')[0].style.border = 'red';
              let hasTakenSlot = false;
              let tally = 0;
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
                if (tally === 3) {
                  setGameover(true);
                }
              });
              setHealth(updatedHealth);
              setTimeout(() => {
                document.getElementsByTagName('textarea')[0].style.color = 'black';
                document.getElementsByTagName('textarea')[0].style.border = 'black';
                document.getElementsByTagName('textarea')[0].value = '';
              }, 1000);
            }
          }}
        >
          Submit

        </button>
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
};
