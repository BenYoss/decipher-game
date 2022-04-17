/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

let counter = 0;
let chart;
export default function Graph({ ciphers, dataType, setReload }) {
  const dates = ciphers.map((cipher) => cipher.gameDate);
  const selectData = () => {
    let resolverArr = [];
    if (dataType === 'attempts') {
      resolverArr = ciphers.map((cipher) => cipher.cipherAttempts.filter((attempt) => {
        if (attempt) {
          return attempt;
        }
      }).length);
    } if (dataType === 'wins') {
      resolverArr = ciphers.map((cipher) => cipher.isWin);
    } if (dataType === 'times') {
      resolverArr = ciphers.map((cipher) => {
        const times = cipher.time.split(':');
        const mil = Number(times[times.length - 1]) * 10;
        const sec = Number(times[times.length - 2]) * 100;
        const min = Number(times[1]) * 1000;
        const hr = Number(times[0]) * 10000;
        return mil + sec + min + hr;
      });
    }

    if (document.getElementById('stats-chart')) {
      if (chart) {
        chart.destroy();
      }
      const data = {
        labels: dates,
        datasets: [{
          axis: 'y',
          label: 'My First Dataset',
          data: resolverArr,
          fill: false,
          backgroundColor: [
            'rgb(37, 95, 31)',
          ],
          borderColor: [
            'rgba(62,167,53,1)',
          ],
          borderWidth: 1,
        }],
      };
      chart = new Chart(document.getElementById('stats-chart').getContext('2d'), {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              stacked: true,
            },
          },
        },
      });
    }
    return null;
  };

  useEffect(() => {
    counter += 10;
    selectData();
  }, [counter]);

  return (
    <div id="stats-chart-container">
      <canvas id="stats-chart" width="100%" height="100%" />
    </div>
  );
}

Graph.propTypes = {
};
