/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import propTypes from 'prop-types';

const Legend = Chart.defaults.plugins.legend;

Chart.register(ChartDataLabels);

let counter = 0;
let chart;
export default function Graph({ ciphers, dataType }) {
  const dateTimes = {
    Sun: 1,
    Mon: 2,
    Tue: 3,
    Wed: 4,
    Thu: 5,
    Fri: 6,
    Sat: 7,
  };
  const dates = ciphers.map((cipher) => cipher.gameDate).sort((a, b) => dateTimes[a.slice(0, 3)]
   - dateTimes[b.slice(0, 3)]);
  let formatter;
  const orderByDate = (arr) => {
    const order = arr.map((v) => {
      v.gameDate = v.gameDate.slice(0, 3);
      return v;
    });
    const result = [...dates];
    order.forEach((value) => {
      result[result.indexOf(value.gameDate)] = value;
    });
    return result;
  };
  const cipherValues = orderByDate(ciphers);
  const selectData = () => {
    let resolverArr = [];
    if (dataType === 'attempts') {
      resolverArr = cipherValues.map((cipher) => cipher.cipherAttempts.filter((attempt) => {
        if (attempt) {
          return attempt;
        }
      }).length);
      formatter = (value) => `${value}`;
    } if (dataType === 'wins') {
      resolverArr = cipherValues.map((cipher) => cipher.isWin);
      formatter = function (value) {
        switch (value) {
          case false:
            return 'Loss';
          case true:
            return 'Win';
          default:
            return null;
        }
      };
    } if (dataType === 'times') {
      let times;
      let mil;
      let sec;
      let min;
      let hr;
      resolverArr = cipherValues.map((cipher) => {
        times = cipher.time.split(':');
        mil = Number(times[times.length - 1]) * 1;
        sec = Number(times[times.length - 2]) * 100;
        min = Number(times[1]) * 10000;
        hr = Number(times[0]) * 1000000;
        return mil + sec + min + hr;
      });

      formatter = function (value, index) {
        const def = '00:00:00:00';
        const stringified = String(value);
        let result = stringified;
        for (let i = 2; i < result.length; i += 3) {
          const splitted = result.split('');
          splitted.splice(i, 0, ':');
          result = splitted.join('');
        }
        const splitter = def.split('');
        for (let i = 1; i < def.length; i += 1) {
          if (result[result.length - (i)]) {
            splitter[i - 1] = result[result.length - (i)];
          } else {
            break;
          }
        }
        return splitter.reverse().join('');
      };
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
        type: 'bar',
        data,
        options: {
          events: [],
          responsive: true,
          scales: {
            y: {
              ticks: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              color: 'white',
              anchor: 'end',
              align: 'bottom',
              font: {
                size: 20,
              },
              formatter,
            },
          },
        },
        showTooltips: false,
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
  ciphers: propTypes.element.isRequired,
  dataType: propTypes.string.isRequired,
};
