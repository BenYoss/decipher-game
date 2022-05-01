/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';
import { updateCookies, getAttemptCount } from '../../helpers/helpers';
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

export default function Victory({
  time, health, attempts, date, cookies, setReload, downloadURL, text, level,
}) {
  let finishedText = '';
  const times = time.split(':');
  const sec = Number(times[2]);
  const min = Number(times[1]);
  if (sec < 30) {
    finishedText = 'Wow! Inhuman solving speed!';
  } else if (min < 2) {
    finishedText = 'Pretty fast!';
  } else if (min < 5) {
    finishedText = 'Average time!';
  } else if (min < 10) {
    finishedText = 'Pretty slow';
  }

  const attemptCount = getAttemptCount(health);
  let isDuplicate = false;
  cookies && cookies.timeHistory.forEach((cookie) => {
    if (cookie.gameDate === date) {
      isDuplicate = true;
    }
  });
  if (!isDuplicate) {
    updateCookies(date, time, attemptCount, true, attempts);
  }
  return (
    <motion.div id="gameover-container" animate={modalAnimation} initial={{ opacity: '0%' }} transition={{ duration: 0.5 }}>
      <div id="gameover-header">
        <h2 id="gameover-text">Correct!</h2>
      </div>
      <hr />
      <div id="gameover-body">
        <span id="gameover-text">{finishedText}</span>
        <div id="gameover-body">
          <section>
            <div>
              <div id="gameover-metrics-container">
                <section id="gameover-metric">
                  <b id="gameover-time">Time:</b>
                  <p id="gameover-time">
                    <b>{time}</b>
                  </p>
                </section>
                <section id="gameover-metric">
                  <b id="gameover-time">Attempts:</b>
                  <p id="gameover-time">
                    <b>{attemptCount}</b>
                  </p>
                </section>
                <hr />
              </div>
              <div id="download-margin" />
              <div id="download-container">
                <div id="download-header">
                  <p id="download-header-container">
                    <span>{`La-Cipher ${date} - ${level}`}</span>
                  </p>
                  <p id="download-header-time">
                    <span>{time}</span>
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
                    // setTimeout(() => {
                    //   setReload([]);
                    // }, 50);
                  }}
                  id="standard-btn-small"
                  href={downloadURL}
                  download={`decipher_${new Date().toDateString()}.png`}
                >
                  <span id="save-stats">Save Stats</span>
                  <img src={downloadIcon} alt="download icon" style={{ filter: 'invert()' }} width="15" height="15" />
                </motion.a>
              ) : setTimeout(() => setReload([]), 1000)}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

Victory.propTypes = {
  time: propTypes.string.isRequired,
  attempts: [
    {
      open: propTypes.bool.isRequired,
    },
  ],
  health: propTypes.number.isRequired,
  date: propTypes.string.isRequired,
  cookies: {
    timeHistory: propTypes.element.isRequired,
  },
};
