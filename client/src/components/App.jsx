import React from 'react';
import '../styles/app.scss';
import Cipher from './Cipher';

export default function App() {
  return (
    <div id="container">
      <div id="header-container">
        <h4 id="header">Lacipher</h4>
      </div>
      <div id="body-container">
        <div id="ciphered-body">
          <Cipher />
        </div>
        <div id="input-body">
          <h1 className="sample">sample text</h1>
        </div>
      </div>
    </div>
  );
}
