/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import propTypes from 'prop-types';

const modalAnimation = {
  scale: 2,
  opacity: '100%',
};

// Variant 1:
// const hoverAnimation = {
//   scale: 1.05,
//   backgroundColor: ['hsl(0, 61%, 0%)', 'hsl(127, 61%, 12%)'],
//   color: 'hsl(180, 61%, 100%)',
// };
// const leaveAnimation = {
//   scale: 1.0,
//   backgroundColor: ['hsl(127, 61%, 12%)', 'hsl(0, 61%, 0%)'],
//   color: 'hsl(180, 61%, 100%)',
// };

// variant 2

const hoverAnimation = {
  scale: 1.1,
  boxShadow: '0px 0px 8px hsl(120, 61%, 50%)',
};
const leaveAnimation = {
  scale: 1.0,
  boxShadow: '0px 0px 0px hsl(120, 61%, 50%)',
};

/**
 * @func Howtoplay is a react component for the Howtoplay modal.
 * @param {*} setSkipped props for skip state in parent component.
 */
let currentGame;
export default function Howtoplay({
  setSkipped, cookieData, played, setPlayed, text,
}) {
  let gamesPlayed;
  if (cookieData) {
    gamesPlayed = cookieData.timeHistory;
    if (!played) {
      gamesPlayed.forEach((game) => {
        if (game.gameDate === new Date().toDateString()) {
          currentGame = game;
          setPlayed(true);
        }
      });
    }
  }
  return (
    <motion.div
      id="gameover-container"
      animate={modalAnimation}
      initial={{ opacity: '0%' }}
      transition={{ duration: 0.5 }}
    >
      {!played ? (
        <>
          <div id="gameover-header">
            <h2 id="gameover-text">How to Play</h2>
          </div>
          <hr />
          <div id="gameover-body">
            <p id="gameover-text">A cipher is an encrypted pattern of text. Try to solve this cipher...</p>
            <p id="gameover-text">
              If you get it wrong 3 times
              {' '}
              <b>GAME OVER!</b>
            </p>
            <br />
            <hr />
            <motion.button
              id="standard-btn"
              type="button"
              whileHover={hoverAnimation}
              animate={leaveAnimation}
              initial="hidden"
              transition={{ duration: 0.18 }}
              onClick={() => setSkipped(true)}
            >
              Continue

            </motion.button>
          </div>

        </>
      ) : (
        <>
          <div id="gameover-header">
            <h2 id="gameover-text">Cipher Completed!</h2>
          </div>
          <div id="gameover-body">
            <p id="gameover-text">
              Looks like you already completed today&apos;s cipher.
            </p>
            <p id="played-modal-cipher">
              <b>{text}</b>
            </p>
          </div>
          <div id="gameover-body">
            <section>
              {
                currentGame
             && (
             <section id="gameover-text">
               <b id="gameover-time">Time:</b>
               <p id="gameover-time">
                 <b>{currentGame.time}</b>
               </p>
             </section>
             )
              }
            </section>
            <section>
              <p id="gameover-text">
                Wait until tomorrow to play
                again!
              </p>
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
};
