/* eslint-disable react/require-default-props */
import React from 'react';
import propTypes from 'prop-types';

export default function Health({ healthbar }) {
  return (
    <>
      <div id="health-container">
        {
              healthbar.map((slot, i) => {
                if (!slot.open) {
                  return (
                    <div className="slot used" id={i} />
                  );
                }
                return (
                  <div className="slot full" id={i} />
                );
              })
          }
      </div>
      <div id="level-block" />
    </>
  );
}

Health.propTypes = {
  healthbar: {
    open: propTypes.bool.isRequired,
  },
};
