/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cipher from './Cipher';
import Input from './Input';
import Level from './Level';
import seedData from '../../../data/seed.json';
import Health from './Health';
import Gameover from './modals/Gameover';
import Victory from './modals/Victory';
import Howtoplay from './modals/Howtoplay';
import '../styles/app.scss';
import 'regenerator-runtime/runtime';

export default function App() {
  const [text, setText] = useState('');
  const [level, setLevel] = useState(1);
  const [gameover, setGameover] = useState(false);
  const [victory, setVictory] = useState(false);
  const [percent, setPercent] = useState(100);
  const [health, setHealth] = useState([{ open: true }, { open: true }, { open: true }]);
  const [mutation, setMutation] = useState(null);
  const [skipped, setSkipped] = useState(false);

  async function calculateText() {
    let levelData = { text: '' };
    if (!seedData.length) {
      const { data } = await axios.get('/addcipher');
      levelData = data;
    }
    for (const sentence of seedData) {
      if (sentence.dateIssued === new Date().toDateString()) {
        levelData = sentence;
      }
    }
    if (!levelData.text.length) {
      const { data } = await axios.get('/addcipher');
      levelData = data;
    }
    setText(levelData.text);
    setLevel(levelData.levelType);
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
      {!skipped && (
      <>
        <Howtoplay setSkipped={setSkipped} />
        <div id="htp-bg" />
      </>
      )}
      {gameover && (<Gameover level={level} percent={percent} />)}
      {victory && (<Victory level={level} percent={percent} />)}
      <div id="body-container-pc">
        <div id="ciphered-body">
          {skipped && <Cipher text={text} gameover={gameover} level={level} mutation={mutation} />}
        </div>
        <div id="input-body">
          <Input
            text={text}
            setLevel={setLevel}
            level={level}
            health={health}
            setHealth={setHealth}
            setGameover={setGameover}
            setVictory={setVictory}
            setPercent={setPercent}
            percent={percent}
          />
        </div>
      </div>
    </div>
  );
}
