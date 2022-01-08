import React from 'react';

export default function Cipher() {
  const body = 'The giant brown fox jumped over the lazy dog .';
  const bodyArray = body.split(' ');
  return (
    <div id="cipher-cluster">
      {bodyArray.map((word) => (
        <div id="cipher-word">
          <h4 id="cipher-text">
            {word}
          </h4>
        </div>
      ))}
    </div>
  );
}
