/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cipher from './Cipher';
import Input from './Input';
import Level from './Level';
import { getCiphersFromDB } from '../helpers/helpers';
import Health from './Health';
import Gameover from './modals/Gameover';
import Victory from './modals/Victory';
import Howtoplay from './modals/Howtoplay';
import Timer from './Timer';
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
  const [finalTime, setFinalTime] = useState('00:00:00:00');

  async function calculateText() {
    let levelData = { text: '' };
    const { data: ciphers } = await getCiphersFromDB().catch((err) => console.error(err));
    if (!ciphers.length) {
      const { data } = await axios.get('/addcipher');
      levelData = data;
    }
    ciphers.forEach((sentence) => {
      if (sentence.date_issued === new Date().toDateString()) {
        levelData = sentence;
      }
    });
    if (!levelData.text.length) {
      const { data } = await axios.get('/addcipher');
      levelData = data;
    }
    setText(levelData.text);
    setLevel(levelData.level_type);
    setMutation(levelData.mutation);
  }

  useEffect(() => {
    calculateText();
  }, []);

  return (
    <div id="container">
      <div id="health-body">
        <Health healthbar={health} />
        {skipped && (
        <Timer
          setFinalTime={setFinalTime}
          gameover={gameover}
          victory={victory}
        />
        )}
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
        <div id="modal-bg" />
      </>
      )}
      {gameover && (
      <>
        <Gameover level={level} percent={percent} finalTime={finalTime} />
        <div id="modal-bg" />
      </>
      )}
      {victory && (
      <>
        <Victory level={level} percent={percent} time={finalTime} />
        <div id="modal-bg" />
      </>
      )}
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
