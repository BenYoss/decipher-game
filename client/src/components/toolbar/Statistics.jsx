/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import Graph from './Graph';
import dataTypes from './datatypes.json';

export default function Statistics({ ciphers, setReload }) {
  const [dataType, setDataType] = useState('wins');
  function handleDataTypes(direction) {
    if (direction === 'up') {
      const next = dataTypes.indexOf(dataType) + 1 < dataTypes.length
        ? dataTypes.indexOf(dataType) + 1 : 0;
      setDataType(dataTypes[next]);
    } else if (direction === 'down') {
      const next = dataTypes.indexOf(dataType) - 1 >= 0 ? dataTypes.indexOf(dataType) - 1
        : dataTypes.length - 1;
      setDataType(dataTypes[next]);
    }
  }

  return (
    <div id="settings-container">
      <div id="settings-header-title">
        <p id="drawer-title">Statistics</p>
      </div>
      <hr />
      <div id="stats-datatype-head">
        <div id="stats-datatype-header">
          <p id="drawer-title">Select Type</p>
        </div>
        <div id="stats-datatype-selector">
          <button id="standard-btn" style={{ transform: 'scale(0.5)' }} type="button" onClick={() => handleDataTypes('down')} className="datatype-selector-btn">{'<'}</button>
          <p id="drawer-title">{dataType.toUpperCase()}</p>
          <button id="standard-btn" style={{ transform: 'scale(0.5)' }} type="button" onClick={() => handleDataTypes('up')} className="datatype-selector-btn">{'>'}</button>
        </div>
      </div>
      {ciphers ? (
        <div id="chart-container">
          <Graph ciphers={ciphers} dataType={dataType} setReload={setReload} />
        </div>
      ) : (
        <div id="stats-chart">
          <p id="no-stats-fallback" alt="fallback text">
            No game data found.
          </p>
        </div>
      )}
    </div>
  );
}

Statistics.propTypes = {
  ciphers: propTypes.element.isRequired,
  setReload: propTypes.func.isRequired,
};
