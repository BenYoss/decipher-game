/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import coffeeIcon from './coffee-glowing.svg';

export default function Donate() {
  return (
    <div id="settings-container">
      <div id="settings-header">
        <p id="drawer-title">Donate</p>
      </div>
      <hr />
      <div id="donation-head">
        <div className="donation-section">
          <h1>Want to buy me a coffee?</h1>

        </div>
        <div className="donation-section">
          <img src={coffeeIcon} alt="donation button" width="200px" height="200px" />

        </div>
        <div className="donation-section">
          <h1>Click the icon above</h1>
        </div>
      </div>
    </div>
  );
}

Donate.propTypes = {
};
