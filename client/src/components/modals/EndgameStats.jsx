import React from 'react';
import propTypes from 'prop-types';

export default function EndgameStats({ cipher, cookies }) {
  const modalAnimation = {
    x: 0,
    opacity: '100%',
  };
  return (
    <div id="endgame-stats-container">
      {
            cookies.cipherAttempts.map((attempt, i) => (
              <div className="endgame-stat-cluster" style={{ maxHeight: `${(cookies.cipherAttempts.length * 10)}px` }}>
                {cipher.map((word, index) => {
                  if (cookies.cipherAttempts[i][index]) {
                    return (<div className="stat-word-right" id={index} style={{ minWidth: `${(word.length * 10)}%` }} initial={{ x: -200, opacity: '0%' }} animate={modalAnimation} transition={{ duration: (index + 3) / 5 }} />);
                  }
                  return (<div className="stat-word-wrong" id={index} width={`${(word.length * 10)}%`} initial={{ x: -200, opacity: '0%' }} animate={modalAnimation} transition={{ duration: (index + 3) / 5 }} />);
                })}
              </div>
            ))
        }
    </div>
  );
}

EndgameStats.propTypes = {
  cipher: propTypes.string.isRequired,
  cookies: propTypes.string.isRequired,
};
