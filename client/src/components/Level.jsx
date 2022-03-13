import React from 'react';
import propTypes from 'prop-types';

export default function Level({ level }) {
  let levelBanner;
  if (level <= 2) {
    levelBanner = 'level-container';
  } else if (level <= 4) {
    levelBanner = 'level-container-normal';
  } else if (level <= 5) {
    levelBanner = 'level-container-difficult';
  } else if (level <= 7) {
    levelBanner = 'level-container-hard';
  }
  return (
    <>
      <div id={levelBanner}>
        <p id="level-text">Level</p>
        <p id="level">{level}</p>
        <div id="level-crease" />
      </div>
      <div id="level-block" />
    </>
  );
}

Level.propTypes = {
  level: propTypes.string.isRequired,
};
