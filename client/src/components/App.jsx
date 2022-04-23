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
import Attempts from './Attempts';
import Toolbar from './toolbar/Toolbar';

import '../styles/app.scss';
import '../styles/endgameStats.scss';
import '../styles/attempts.scss';
import '../styles/howToPlay.scss';
import '../styles/toolbar.scss';
import '../styles/statistics.scss';
import '../styles/levelSelection.scss';
import 'regenerator-runtime/runtime';

let cipherCookies;

document.documentElement.setAttribute('data-theme', localStorage.getItem('data-theme') || 'light');

export default function App() {
  const [text, setText] = useState(null);
  const [level, setLevel] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [victory, setVictory] = useState(false);
  const [percent, setPercent] = useState(100);
  const [health, setHealth] = useState([{ open: true }, { open: true },
    { open: true }, { open: true }]);
  const [mutation, setMutation] = useState(null);
  const [skipped, setSkipped] = useState(false);
  const [finalTime, setFinalTime] = useState(false);
  const [cookies, setCookies] = useState(null);
  const [played, setPlayed] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  const [mutationCiphers, setMutationCiphers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [, setReload] = useState([]);
  const [thisWeeksCiphers, setThisWeeksCiphers] = useState([]);
  const [levelSwapped, setLevelSwapped] = useState(false);
  const [date, setDate] = useState();
  const [disableTimer, setDisableTimer] = useState(false);

  function getThisWeeksCiphers(cipherss) {
    let days;
    let lastSevenDays;
    let startOfWeek;
    if (cipherss[0].gameDate) {
      days = cipherss.map((cipher) => cipher.gameDate.slice(0, 3));
      lastSevenDays = cipherss.slice(-7);
      startOfWeek = lastSevenDays.slice(lastSevenDays.length === 7 ? days.indexOf('Sun') : 0);
    }
    if (cipherss[0].date_issued) {
      days = cipherss.map((cipher) => cipher.date_issued.slice(0, 3));
      lastSevenDays = cipherss.slice(-7);
      const sevenDays = days.slice(-7);
      startOfWeek = lastSevenDays.slice(lastSevenDays.length === 7 ? sevenDays.indexOf('Sun') : 0);
      setThisWeeksCiphers(startOfWeek);
    }
    return startOfWeek;
  }

  if (!cipherCookies) {
    cipherCookies = cookies && getThisWeeksCiphers(cookies.timeHistory);
  }

  if (!downloadURL) {
    if (played || victory || gameover) {
      getShareDownload().then((url) => {
        setDownloadURL(url);
      });
    }
  }

  const now = new Date(); const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  async function calculateText() {
    let levelData = { text: '' };
    const { data: ciphers } = await getCiphersFromDB().catch((err) => console.error(err));
    if (!ciphers.length) {
      const { data } = await axios.get('/addcipher');
      levelData = data;
    }
    ciphers.forEach((sentence) => {
      if (sentence.date_issued === utc.toDateString()) {
        levelData = sentence;
      }
    });
    if (!levelData.text.length) {
      const { data: resultText } = await axios.get('/addcipher');
      levelData = resultText;
    }
    setText(levelData.text);
    setLevel(levelData.levelType || levelData.level_type);
    setMutation(levelData.mutation);
    setDate(levelData.date_issued);
    getThisWeeksCiphers(ciphers);
  }

  useEffect(() => {
    if (!text && !level && !mutation) {
      calculateText();
      if (!cookies) {
        getCookies()
          .then((data) => {
            setCookies(data.data.userData);
          });
      }
    }
  }, [text, level, mutation]);

  return (
    <div id="container">
      <div id="nav-body">
        <div id="timer-bo">
          {skipped && (
          <Timer
            setFinalTime={setFinalTime}
            gameover={gameover}
            victory={victory}
            drawerOpened={drawerOpened}
            levelSwapped={levelSwapped}
            setLevelSwapped={setLevelSwapped}
            disableTimer={disableTimer}
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
          {text && (
            <Level level={level} />
          )}
        </div>
      </div>
      {(!skipped && text && level > 0) && !levelSwapped ? (
        <>
          <Howtoplay
            setSkipped={setSkipped}
            cookieData={cookies}
            played={played}
            setPlayed={setPlayed}
            text={text}
            downloadURL={downloadURL}
            level={level}
            setReload={setReload}
            date={date}
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
      ) : null}

      {levelSwapped ? (
        <>
          <Howtoplay
            setSkipped={setSkipped}
            cookieData={cookies}
            played={played}
            setPlayed={setPlayed}
            text={text}
            downloadURL={downloadURL}
            level={level}
            setReload={setReload}
            date={date}
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
      ) : null}
      {gameover && finalTime && (
      <>
        <Gameover
          level={level}
          percent={percent}
          finalTime={finalTime}
          text={text}
          health={health}
          attempts={attempts}
          date={date}
          cookies={cookies}
          id="gameover"
        />
        <div className="modal-bg" id="finish-modal-bg" />
      </>
      )}
      {victory && finalTime && (
      <>
        <Victory
          level={level}
          percent={percent}
          time={finalTime}
          health={health}
          attempts={attempts}
          date={date}
          cookies={cookies}
        />
        <div id="modal-bg" />
      </>
      )}
      <Toolbar
        setDrawerOpened={setDrawerOpened}
        ciphers={cipherCookies && cipherCookies}
        setReload={setReload}
        thisWeeksCiphers={thisWeeksCiphers}
        setText={setText}
        setLevel={setLevel}
        setMutation={setMutation}
        setLevelSwapped={setLevelSwapped}
        setDate={setDate}
        setPlayed={setPlayed}
        date={date}
        setHealth={setHealth}
        setAttempts={setAttempts}
        skipped={skipped}
        setDownloadURL={setDownloadURL}
        downloadURL={downloadURL}
        setSkipped={setSkipped}
        setDisableTimer={setDisableTimer}
        setGameover={setGameover}
        setVictory={setVictory}
      />
      <div id="body-container-pc">
        <div id={window.innerWidth > 750 ? 'ciphered-body' : 'ciphered-body-mobile'}>
          {skipped && (
          <>
            {
              attempts.map((attempt, index) => (
                <Attempts
                  attempt={attempt}
                  margin={index * 5}
                  text={text}
                  index={attempts.length - index}
                  opened={drawerOpened}
                />
              ))
            }
            <div>
              <Cipher
                text={text}
                gameover={gameover}
                level={level}
                mutation={mutation}
                setMutationCiphers={setMutationCiphers}
                mutationCiphers={mutationCiphers}
                opened={drawerOpened}
              />
            </div>
          </>
          )}
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
            attempts={attempts}
            setAttempts={setAttempts}
          />
        </div>
      </div>
    </div>
  );
}
