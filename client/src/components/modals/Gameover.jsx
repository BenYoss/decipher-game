/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateCookies, getAttemptCount, clearCount } from '../../helpers/helpers';
import downloadIcon from '../../img/download.png';
import EndgameStats from './EndgameStats';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

const hoverAnimation = {
  scale: 1.1,
  boxShadow: '0px 0px 8px hsl(120, 61%, 50%)',
};

const leaveAnimation = {
  scale: 1.0,
  boxShadow: '0px 0px 0px hsl(120, 61%, 50%)',
};

export default function Gameover({
  finalTime, health, attempts, date, setReload, downloadURL, text, level,
}) {
  const attemptCount = getAttemptCount(health);
  updateCookies(date, finalTime, attemptCount, false, attempts);
  clearCount();
  return (
    <motion.div id="gameover-container" animate={modalAnimation} initial={{ opacity: '0%' }} transition={{ duration: 0.5, delay: 0.9 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">GAME OVER</h2>
      </div>
      <hr />
      <div id="gameover-body">
        <div id="gameover-cipher-container">
          <p id="played-modal-cipher">
            <b>{text}</b>
          </p>
        </div>
        <div id="gameover-body">
          <section>
            <div>
              <div id="gameover-metrics-container">
                <section id="gameover-metric">
                  <b id="gameover-time">Time:</b>
                  <p id="gameover-time">
                    <b>{finalTime}</b>
                  </p>
                </section>
                <section id="gameover-metric">
                  <b id="gameover-time">Attempts:</b>
                  <p id="gameover-time">
                    <b>{attemptCount < 1 ? attemptCount + 1 : attemptCount}</b>
                  </p>
                </section>
                <hr />
              </div>
              <div id="download-margin" />
              <div id="download-container">
                <div id="download-header">
                  <p id="download-header-container">
                    <span>{`Ciphrase ${date} - ${level}`}</span>
                  </p>
                  <p id="download-header-time">
                    <span>{finalTime}</span>
                  </p>
                </div>
                <EndgameStats cipher={text.split(' ')} cookies={{ cipherAttempts: attempts }} />
              </div>
            </div>
          </section>
          <p id="gameover-text">
            Wait until tomorrow for the next cipher!
          </p>
          <section>
            <div id="download-btn-container">
              {downloadURL ? (
                <motion.a
                  className="button"
                  whileHover={hoverAnimation}
                  animate={leaveAnimation}
                  transition={{ duration: 0.18 }}
                  onClick={() => {
                    setReload([]);
                  }}
                  id="standard-btn-small"
                  href={downloadURL}
                  download={`ciphrase_${new Date().toDateString()}.png`}
                >
                  <span id="save-stats">Save Stats</span>
                  <img src={downloadIcon} alt="download icon" style={{ filter: 'invert()' }} width="15" height="15" />
                </motion.a>
              ) : setTimeout(() => setReload([]), 300)}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

Gameover.propTypes = {
  finalTime: propTypes.string.isRequired,
  attempts: [
    {
      open: propTypes.bool.isRequired,
    },
  ],
  health: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
  setReload: propTypes.func.isRequired,
  downloadURL: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  level: propTypes.string.isRequired,
};
