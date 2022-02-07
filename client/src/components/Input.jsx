import React, { useState } from 'react';
import propTypes from 'prop-types';

export default function Input({ text, setLevel, level }) {
  const [val, useVal] = useState('');
  return (
    <div id="cipher-input-container">
      <form>
        <textarea onChange={(e) => useVal(e.target.value)} />
        <button
          id="standard-btn"
          type="button"
          onClick={() => {
            if (val === text) {
              document.getElementsByTagName('textarea')[0].style.color = 'lime';
              document.getElementsByTagName('textarea')[0].style.border = 'lime';
              setLevel(level + 1);
              setTimeout(() => {
                document.getElementsByTagName('textarea')[0].style.color = 'black';
                document.getElementsByTagName('textarea')[0].style.border = 'black';
                document.getElementsByTagName('textarea')[0].value = '';
              }, 1000);
            }
          }}
        >
          Submit

        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  text: propTypes.string.isRequired,
  setLevel: propTypes.func.isRequired,
  level: propTypes.string.isRequired,
};
