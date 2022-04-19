/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import propTypes from 'prop-types';

import level1 from './level-select-banner-lvl1.svg';
import level2 from './level-select-banner-lvl2.svg';
import level3 from './level-select-banner-lvl3.svg';
import level4 from './level-select-banner-lvl4.svg';
import level5 from './level-select-banner-lvl5.svg';
import level6 from './level-select-banner-lvl6.svg';
import level7 from './level-select-banner-lvl7.svg';
import locked from './level-select-banner-locked.svg';
import checked from './level-select-banner-checked.svg';

const cipherList = ['1', '2', '3', '4', '5', '6', '7'];
const levelList = [level1, level2, level3, level4, level5, level6, level7];

export default function LevelSelection({
  thisWeeksCiphers, setText, setLevel,
  setMutation, setLevelSwapped,
  ciphers, setDate, setPlayed, date, setHealth,
}) {
  const weeklyCiphers = thisWeeksCiphers;
  const cookieCiphers = ciphers ? ciphers.map((cipher) => cipher.gameDate) : [];
  for (let i = weeklyCiphers.length; i < 7; i += 1) {
    weeklyCiphers.push({ level_type: 'locked' });
  }

  const handleCipherSwitch = (cipher) => {
    setText(cipher.text);
    setLevel(cipher.levelType || cipher.level_type);
    setMutation(cipher.mutation);
    setDate(cipher.date_issued);
    setLevelSwapped(true);
    setPlayed(false);
    setHealth([{ open: true }, { open: true },
      { open: true }, { open: true }]);
  };

  return (
    <div id="settings-container">
      <div id="settings-header">
        <p id="drawer-title">Level Selection</p>
      </div>
      <hr />
      <div id="settings-body">
        <div id="level-list">
          {
            weeklyCiphers.map((cipher, i) => {
              if (cookieCiphers.includes(cipher.date_issued)) {
                return (
                  <div id={i + 1} className="level-list-entry">
                    <img
                      src={checked}
                      alt="play-level-played"
                      className={cipher.date_issued === date ? 'level-list-icon-selected' : 'level-list-icon'}
                      onClick={() => handleCipherSwitch(cipher)}
                    />
                  </div>
                );
              }
              if (cipherList.includes(cipher.level_type)) {
                return (
                  <div id={i} className="level-list-entry">
                    <img
                      src={levelList[i]}
                      alt={`play-level-${cipher.level_type}`}
                      className={cipher.date_issued === date ? 'level-list-icon-selected' : 'level-list-icon'}
                      onClick={() => handleCipherSwitch(cipher)}
                    />
                  </div>
                );
              }
              return (
                <div id={i + 1} className="level-list-entry">
                  <img src={locked} alt="play-level-locked" className="level-list-icon-locked" />
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

LevelSelection.propTypes = {
  date: propTypes.string.isRequired,
  setLevel: propTypes.func.isRequired,
  setHealth: propTypes.func.isRequired,
  thisWeeksCiphers: propTypes.element.isRequired,
  setText: propTypes.func.isRequired,
  setMutation: propTypes.func.isRequired,
  setDate: propTypes.func.isRequired,
  setPlayed: propTypes.func.isRequired,
  setLevelSwapped: propTypes.func.isRequired,
  ciphers: propTypes.element.isRequired,
};
