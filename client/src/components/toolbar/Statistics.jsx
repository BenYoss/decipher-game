/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

export default function Statistics() {
  return (
    <div id="settings-container">
      <div id="settings-header">
        <p id="drawer-title">Statistics</p>
        <hr />
      </div>
      <div id="settings-body">
        <div id="settings-type-dark-mode" />
      </div>
    </div>
  );
}

Statistics.propTypes = {
};
