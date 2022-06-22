/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import coffeeIcon from './coffee-glowing.svg';
import paypalIcon from '../../img/button-PayPal-donate.png';

export default function Donate() {
  return (
    <div id="settings-container">
      <div id="settings-header-title">
        <p id="drawer-title">Donate</p>
      </div>
      <hr />
      <div id="donation-head">
        <div className="donation-section">
          <h1>Want to buy me a coffee?</h1>
        </div>
        <div className="donation-section">
          <img src={coffeeIcon} alt="donation button" width="200px" height="200px" style={{ marginLeft: '35px' }} />
        </div>
        <div className="donation-section" style={{ transform: 'scale(1.4)' }}>
          <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="business" value="88F8NHUMFS7Z4" />
            <input type="hidden" name="no_recurring" value="0" />
            <input type="hidden" name="item_name" value="Thanks for contributing to my website! Your funds will assist with my software projects and college tuition!" />
            <input type="hidden" name="currency_code" value="USD" />
            <input type="image" style={{ transform: 'scale(0.5)' }} src={paypalIcon} border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
            <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
          </form>
        </div>
      </div>
    </div>
  );
}

Donate.propTypes = {
};
