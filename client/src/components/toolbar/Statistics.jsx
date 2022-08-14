/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import propTypes from 'prop-types';
import Graph from './Graph';
import dataTypes from './datatypes.json';

export default function Statistics({
  ciphers,
  setReload,
  thisWeeksCiphers,
  thisWeeksCookieCiphers
}) {
  const [dataType, setDataType] = useState('wins');

  const buttonScaleSize = window.innerWidth > 750 ? 'scale(0.5)' : 'scale(1)';

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
          <p id="drawer-title">Choose Type</p>
        </div>
        <div id="stats-datatype-selector">
          <button id="standard-btn" style={{ transform: buttonScaleSize }} type="button" onClick={() => handleDataTypes('down')} className="datatype-selector-btn">{'<'}</button>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p id="drawer-title">{dataType.toUpperCase()}</p>
            {
              dataType === 'time' && (
                <p id="drawer-title" style={{ transform: 'scale(0.8)' }}>(minutes)</p>
              )
            }
          </div>
          <button id="standard-btn" style={{ transform: buttonScaleSize }} type="button" onClick={() => handleDataTypes('up')} className="datatype-selector-btn">{'>'}</button>
        </div>
      </div>
      {ciphers ? (
        <div id="chart-container">
          <Graph
            ciphers={ciphers}
            dataType={dataType}
            setReload={setReload}
            thisWeeksCiphers={thisWeeksCiphers}
            thisWeeksCookieCiphers={thisWeeksCookieCiphers}
          />
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
