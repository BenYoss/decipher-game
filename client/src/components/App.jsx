import React from 'react';
import Cipher from './Cipher';
import Input from './Input';
import '../styles/app.scss';

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
          <Input />
        </div>
      </div>
    </div>
  );
}
