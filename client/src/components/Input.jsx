import React, { useState } from 'react';

export default function Input() {
  const { text, setText } = useState('');
  return (
    <div id="cipher-input-container">
      <form>
        <textarea onChange={(e) => setText(e.target.value)} value={text} />
        <button id="standard-btn" type="button" onClick={(e) => setText(e.target.value)}>Submit</button>
      </form>
    </div>
  );
}
