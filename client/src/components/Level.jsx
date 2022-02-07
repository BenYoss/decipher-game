import React from 'react';
import propTypes from 'prop-types';

export default function Level({ level }) {
  return (
    <>
      <div id="level-container">
        <p id="level-text">Level</p>
        <p id="level">{level}</p>
      </div>
      <div id="level-block" />
    </>
  );
}

Level.propTypes = {
  level: propTypes.string.isRequired,
};
