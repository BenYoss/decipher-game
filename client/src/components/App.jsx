/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import Cipher from './Cipher';
import Input from './Input';
import Level from './Level';
import seedData from '../../../data/seed.json';
import Health from './Health';
import Gameover from './Gameover';
import '../styles/app.scss';

export default function App() {
  const [text, setText] = useState('');
  const [level, setLevel] = useState(1);
  const [gameover, setGameover] = useState(false);
  const [percent, setPercent] = useState(100);
  const [health, setHealth] = useState([{ open: true }, { open: true }, { open: true }]);
  const [mutation, setMutation] = useState(null);

  function calculateText() {
    let levelData = { text: '' };
    for (const sentence of seedData) {
      if (sentence.levelType === level && sentence.dateIssued === new Date().toDateString()) {
        levelData = sentence;
      }
    }
    setText(levelData.text);
    console.log(levelData);
    setMutation(levelData.mutation);
  }

  useEffect(() => {
    calculateText();
  }, [level]);

  return (
    <div id="container">
      <div id="health-body">
        <Health healthbar={health} />
      </div>
      <div id="header-container">
        <h4 id="header">Lacipher</h4>
        <div>
          <Level level={level} />
        </div>
      </div>
      {gameover && (<Gameover level={level} percent={percent} />)}
      <div id="body-container-pc">
        <div id="ciphered-body">
          <Cipher text={text} gameover={gameover} level={level} mutation={mutation} />
        </div>
        <div id="input-body">
          <Input
            text={text}
            setLevel={setLevel}
            level={level}
            health={health}
            setHealth={setHealth}
            setGameover={setGameover}
            setPercent={setPercent}
            percent={percent}
          />
        </div>
      </div>
    </div>
  );
}
