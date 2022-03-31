/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cipher from './Cipher';
import Input from './Input';
import Level from './Level';
import { getCiphersFromDB, getCookies, getShareDownload } from '../helpers/helpers';
import Health from './Health';
import Gameover from './modals/Gameover';
import Victory from './modals/Victory';
import Howtoplay from './modals/Howtoplay';
import Timer from './Timer';
import '../styles/app.scss';
import 'regenerator-runtime/runtime';

let count = 0;

export default function App() {
  const [text, setText] = useState('');
  const [level, setLevel] = useState(1);
  const [gameover, setGameover] = useState(false);
  const [victory, setVictory] = useState(false);
  const [percent, setPercent] = useState(100);
  const [health, setHealth] = useState([{ open: true }, { open: true }, { open: true }]);
  const [mutation, setMutation] = useState(null);
  const [skipped, setSkipped] = useState(false);
  const [finalTime, setFinalTime] = useState(false);
  const [cookies, setCookies] = useState(null);
  const [played, setPlayed] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');

  if (count < 1) {
    if (document.getElementById('gameover-metric')) {
      getShareDownload().then((url) => {
        count += 1;
        setDownloadURL(url);
      });
    }
  }

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
    if (!cookies) {
      getCookies()
        .then((data) => {
          setCookies(data.data.userData);
        });
    }
  }, []);

  return (
    <div id="container">
      <div id="nav-body">
        <div id="timer-bo">
          {skipped && (
          <Timer
            setFinalTime={setFinalTime}
            gameover={gameover}
            victory={victory}
          />
          )}
        </div>
        <div id="health-body">

          <Health healthbar={health} />
        </div>

      </div>
      <div id="header-container">
        <h4 id="header">Lacipher</h4>
        <div>
          {level && (
            <Level level={level} />
          )}
        </div>
      </div>
      {!skipped && text && (
      <>
        <Howtoplay
          setSkipped={setSkipped}
          cookieData={cookies}
          played={played}
          setPlayed={setPlayed}
          text={text}
          downloadURL={downloadURL}
        />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <div
          id="htp-bg"
        />
        {!played ? (
          <div
            className="modal-bg"
            id="modal-bg"
            onClick={() => setSkipped(true)}
            tabIndex="0"
            label="modal"
            role="button"
          />
        ) : (
          <div
            className="modal-bg"
            id="finish-modal-bg"
          />
        )}
      </>
      )}
      {gameover && finalTime && (
      <>
        <Gameover
          level={level}
          percent={percent}
          finalTime={finalTime}
          text={text}
          attempts={health}
          id="gameover"
        />
        <div className="modal-bg" id="finish-modal-bg" />
      </>
      )}
      {victory && finalTime && (
      <>
        <Victory level={level} percent={percent} time={finalTime} attempts={health} />
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
