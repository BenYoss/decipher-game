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
  setSkipped, cookieData, played, setPlayed,
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
          <div id="gameover-body">
            <span id="gameover-text">A cipher is an encrypted pattern of text. Try to solve this cipher...</span>
            <span id="gameover-text">
              If you get it wrong 3 times, GAME OVER!
            </span>
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
            <span id="gameover-text">
              Looks like you already completed today&apos;s cipher.
            </span>
            <section>
              {
                currentGame
             && (
             <section>
               <span id="gameover-text">Time:</span>
               <span id="gameover-text">
                 {currentGame.time}
               </span>
             </section>
             )
              }
            </section>
            <section>
              <span id="gameover-text">
                Wait until tomorrow to play
                again!
              </span>
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
