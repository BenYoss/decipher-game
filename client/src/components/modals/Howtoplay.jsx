/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

import downloadIcon from '../../img/download.png';
import EndgameStats from './EndgameStats';
import { copyToClipboard, startTimer } from '../../helpers/helpers';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

const hoverAnimation = {
  scale: 1.1,
  boxShadow: '0px 0px 8px hsl(120, 61%, 50%)',
};

/**
 * @func Howtoplay is a react component for the Howtoplay modal.
 * @param {*} setSkipped props for skip state in parent component.
 */
let currentGame;
export default function Howtoplay({
  setSkipped, cookieData, played, setPlayed, text, downloadURL, level, setReload, date, 
  skipped,
  setHowToPlayButtonClick,
}) {
  // Timers for the count down until the next ciphrase.
  const now = new Date(); const utc = new Date(now.getTime());
  const nowTime = new Date(-Math.abs(utc - new Date(1458619200000)));
  // Initializing the absolute time.
  const absoluteTime = nowTime.toTimeString().slice(0, 8);

  if (played && document.querySelector('#time')) {
    const display = document.querySelector('#time');
    startTimer(absoluteTime, display);
  }
  const [share, setShare] = useState(false);
  const leaveAnimation = {
    scale: 1.0,
    boxShadow: '0px 0px 0px hsl(120, 61%, 50%)',
    backgroundColor: share ? '#08890c' : 'black',
  };
  let cipherSectionMargins = ['-1.5vh', '-8.5vh'];
  if (window.innerWidth < 750) {
    cipherSectionMargins = ['-1.5vh', '-11.2vh'];
  }
  let gamesPlayed;
  if (cookieData) {
    gamesPlayed = cookieData.timeHistory;
    if (!played) {
      let gameExists = false;
      gamesPlayed.forEach((game) => {
        if (game.gameDate === date) {
          currentGame = game;
          gameExists = true;
          setPlayed(true);
        }
      });
      if (cookieData && cookieData.timeHistory.length && !skipped && !gameExists) {
        setSkipped(true);
      }
    }
  }
  return (
    <motion.div
      id="gameover-container"
      className={!played ? '' : 'gameover-container-pc'}
      animate={modalAnimation}
      initial={{ opacity: '0%' }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      {!played ? (
        <>
          <div id="gameover-header">
            <h2 id="gameover-text-header">How to Play</h2>
          </div>
          <hr />
          <div id="gameover-body">
            <p id="gameover-text">
              Every day a new phrase will generate as a cipher
              (encrypted pattern of text), making what we like to call a
              {' '}
              <b>ciphrase</b>
              !

            </p>
            <p id="gameover-text">Ciphrases have increasing difficulty throughout the week and reset at the end of each week.</p>
            <hr />
            <p id="gameover-text">Ciphrases include different encryption patterns.</p>
            <p id="gameover-text">
              For example, the phrase
              {' '}
              <b>Behind Bars</b>
              {' '}
              could have:
            </p>
            <div id="mutations-outter-container">
              <table id="mutations-desc-container">
                <tr className="mutation-example">
                  <td><strong>Swapped Characters:</strong></td>
                  <td>Fehind fars</td>
                </tr>
                <tr className="mutation-example">
                  <td><strong>Reverse Text:</strong></td>
                  <td>srab dniheB</td>
                </tr>
                <tr className="mutation-example">
                  <td><strong>Multiple Characters:</strong></td>
                  <td>Nnnnehind nnnnars</td>
                </tr>
              </table>
            </div>
            <hr />
            <p id="gameover-text">
              A
              {' '}
              <b>GREEN</b>
              {' '}
              box will appear under a right word.
            </p>
            <div
              id="true-example"
              className="example-container"
              style={{ bottom: cipherSectionMargins[0] }}
            >
              <div
                className="cipher-word-attempt-true"
                style={{
                  width: '20%', height: '1vw', marginRight: '0px', marginTop: '0vw',
                }}
              />
            </div>
            <p id="gameover-text">
              A
              {' '}
              <b>GRAY</b>
              {' '}
              box will appear under a wrong word.
            </p>
            <div
              id="false-example"
              className="example-container"
              style={{ bottom: cipherSectionMargins[1] }}
            >
              <div
                className="cipher-word-attempt-false"
                style={{
                  width: '20%', height: '1vw', marginRight: '0px', marginTop: '0vw',
                }}
              />
            </div>
            <hr />
            <b id="gameover-text">
              Complete the ciphrase in under 4 tries!
            </b>
            <div id="modal-btn-container">
              <motion.button
                id="standard-btn-small2"
                type="button"
                whileHover={hoverAnimation}
                animate={leaveAnimation}
                initial="hidden"
                transition={{ duration: 0.18 }}
                onClick={() => {
                  setHowToPlayButtonClick(false);
                  setSkipped(true);
                }}
              >
                Continue

              </motion.button>
            </div>
          </div>

        </>
      ) : (
        <>
          <div id="gameover-header">
            <h2 id="gameover-text">Ciphrase Completed!</h2>
          </div>
          <hr />
          <div id="gameover-cipher-container">
            <p id="played-modal-cipher">
              <b style={{ paddingLeft: '10px', paddingRight: '10px' }}>{text}</b>
            </p>
          </div>
          <div id="gameover-body">
            <section>
              {
                currentGame
             && (
             <div>
               <div id="gameover-metrics-container">
                 <section id="gameover-metric">
                   <b id="gameover-time">Time:</b>
                   <p id="gameover-time">
                     <b>{currentGame.time}</b>
                   </p>
                 </section>
                 <section id="gameover-metric">
                   <b id="gameover-time">Attempts:</b>
                   <p id="gameover-time">

                     <b>
                       {
                        (currentGame.attempts + 1) > 4
                          ? currentGame.attempts : currentGame.attempts + 1
                      }

                     </b>
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
                     <span>{currentGame.time}</span>
                   </p>
                 </div>
                 <EndgameStats cipher={text.split(' ')} cookies={currentGame} />
               </div>
             </div>
             )
              }
            </section>
            <p id="gameover-text">
              Time until the next ciphrase:
            </p>
            <span id="time" style={{ fontSize: '1.9vh' }}>{` ${absoluteTime}`}</span>
            <section>
              <div id="download-btn-container">
                {downloadURL ? (
                  <motion.a
                    className="button"
                    whileHover={hoverAnimation}
                    animate={leaveAnimation}
                    transition={{ duration: 0.18 }}
                    onClick={() => {
                      if (copyToClipboard(downloadURL)) {
                        setShare(true);
                        setTimeout(() => setShare(false), 1000);
                      }
                    }}
                    id="standard-btn-small"
                  >
                    <span id="save-stats">
                      {share ? 'Copied!' : 'Share'}
                    </span>
                    <img src={downloadIcon} alt="download icon" style={{ filter: 'invert()' }} width="15" height="15" />
                  </motion.a>
                ) : setTimeout(() => {
                  setReload([]);
                }, 600)}
              </div>
            </section>
          </div>

        </>
      )}
    </motion.div>
  );
}

Howtoplay.propTypes = {
  setSkipped: propTypes.bool.isRequired,
  cookieData: propTypes.element.isRequired,
  played: propTypes.bool.isRequired,
  setPlayed: propTypes.func.isRequired,
  text: propTypes.string.isRequired,
  downloadURL: propTypes.string.isRequired,
  level: propTypes.number.isRequired,
  setReload: propTypes.func.isRequired,
  date: propTypes.string.isRequired,
};
