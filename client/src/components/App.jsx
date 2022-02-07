/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import Cipher from './Cipher';
import Input from './Input';
import Level from './Level';
import seedData from '../../../data/seed.json';
import '../styles/app.scss';

export default function App() {
  const [text, setText] = useState('');
  const [level, setLevel] = useState(1);

  function calculateText() {
    let levelData = { text: '' };
    for (const sentence of seedData) {
      if (sentence.levelType === `${level}` && sentence.dateIssued === new Date().toDateString()) {
        levelData = sentence;
      }
    }
    setText(levelData.text);
  }

  useEffect(() => {
    calculateText();
  }, [level]);

  return (
    <div id="container">
      <div id="header-container">
        <h4 id="header">Lacipher</h4>
        <div>
          <Level level={level} />
        </div>
      </div>
      <div id="body-container-pc">
        <div id="ciphered-body">
          <Cipher text={text} />
        </div>
        <div id="input-body">
          <Input text={text} setLevel={setLevel} level={level} />
        </div>
      </div>
    </div>
  );
}
