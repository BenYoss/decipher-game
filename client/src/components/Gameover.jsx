/* eslint-disable react/require-default-props */
import React from 'react';
import propTypes from 'prop-types';

export default function Gameover({ level, percent }) {
  return (
    <div id="gameover-container">
      <div id="gameover-header">
        <h2 id="gameover-text">GAME OVER</h2>
      </div>
      <div id="gameover-body">
        <h4 id="gameover-text">You were close, but not close enough!</h4>
        <h3 id="gameover-level">
          Level:
          {level}
        </h3>
        <h4 id="gameover-text2">
          Compared to other users, you are in the top
          {` ${percent}`}
          % in this challenge.
        </h4>
      </div>
    </div>
  );
}

Gameover.propTypes = {
  level: propTypes.string.isRequired,
  percent: propTypes.number.isRequired,
};
