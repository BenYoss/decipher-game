/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

let mode = [false, false];

export default function Settings({ setDisableTimer }) {
  const changeDarkLightModes = (scheme) => {
    let change = 'light';
    if (scheme) {
      change = 'dark';
    }
    localStorage.setItem('data-theme', change);
    document.documentElement.setAttribute('data-theme', localStorage.getItem('data-theme'));
  };

  return (
    <div id="settings-container">
      <div id="settings-header">
        <p id="drawer-title">Settings</p>
      </div>
      <hr />
      <div id="settings-body">
        <div id="settings-header"><p id="settings-title">Enable dark mode</p></div>
        <div id="dark-mode-slider">
          <label className="switch">
            <input
              type="checkbox"
              className="dark-mode-btn"
              id="settings-type-dark-mode"
              onClick={() => {
                mode[0] = !mode[0];
                changeDarkLightModes(mode[0]);
              }}
            />
            <span className="slider round" />
          </label>
        </div>
        <div id="settings-header"><p id="settings-title">Disable Timer</p></div>
        <div id="dark-mode-slider">
          <label className="switch">
            <input
              type="checkbox"
              className="dark-mode-btn"
              id="settings-type-dark-mode"
              onClick={() => {
                mode[1] = !mode[1];
                setDisableTimer(mode[1]);
              }}
            />
            <span className="slider round" />
          </label>
        </div>
      </div>
    </div>
  );
}

Settings.propTypes = {
};
