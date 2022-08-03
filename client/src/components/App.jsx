/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
import React, {
  useState, useEffect, lazy, Suspense,
} from 'react';

import axios from 'axios';
import Cipher from './Cipher';
import Input from './Input';
import Level from './Level';
import {
  getCiphersFromDB, getCookies, getShareDownload,
} from '../helpers/helpers';

import '../styles/app.scss';
import '../styles/endgameStats.scss';
import '../styles/attempts.scss';
import '../styles/howToPlay.scss';
import '../styles/toolbar.scss';
import '../styles/statistics.scss';
import '../styles/levelSelection.scss';
import '../styles/donate.scss';
import 'regenerator-runtime/runtime';
import loading from '../img/loading.gif';
import RewardingEncouragement from './encouragement/RewardingEncouragement';

const Health = lazy(() => import('./Health'));
const Gameover = lazy(() => import('./modals/Gameover'));
const Victory = lazy(() => import('./modals/Victory'));
const Howtoplay = lazy(() => import('./modals/Howtoplay'));
const Timer = lazy(() => import('./Timer'));
const Attempts = lazy(() => import('./Attempts'));
const Toolbar = lazy(() => import('./toolbar/Toolbar'));

let cipherCookies;
let safe = 0;

document.documentElement.setAttribute('data-theme', localStorage.getItem('data-theme') || 'dark');

if (!localStorage.getItem('data-theme')) {
  localStorage.setItem('data-theme', 'dark');
}

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
  const [downloadURL, setDownloadURL] = useState(null);
  const [mutationCiphers, setMutationCiphers] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [, setReload] = useState([]);
  const [thisWeeksCiphers, setThisWeeksCiphers] = useState([]);
  const [thisWeeksCookieCiphers, setThisWeeksCookieCiphers] = useState([]);
  const [levelSwapped, setLevelSwapped] = useState(false);
  const [date, setDate] = useState();
  const [disableTimer, setDisableTimer] = useState(JSON.parse(localStorage.getItem('disable-timer')));
  const [hardMode, setHardMode] = useState(JSON.parse(localStorage.getItem('hard-mode')));
  const [ciphertext, setCiphertext] = useState('');
  const [encouragement, setEncouragement] = useState(true);
  const [howToPlayButtonClick, setHowToPlayButtonClick] = useState(false);

  function getThisWeeksCiphers(cipherss) {
    let days;
    let lastSevenDays;
    let startOfWeek;
    if (cipherss[0].gameDate) {
      const dateTimes = {
        Sun: 1,
        Mon: 2,
        Tue: 3,
        Wed: 4,
        Thu: 5,
        Fri: 6,
        Sat: 7,
      };
      days = cipherss.map((cipher) => cipher.gameDate.slice(0, 3)).slice(-7).sort((a, b) => dateTimes[a.slice(0, 3)]
      - dateTimes[b.slice(0, 3)]);
      lastSevenDays = cipherss.slice(-7);
      const sevenDays = days.slice(-7);
      startOfWeek = lastSevenDays.slice(lastSevenDays.length > 7 ? sevenDays.indexOf('Sun') : 0);
      if (days.slice(days.indexOf('Sun') + 1).includes('Sun')) {
        // startOfWeek.splice(days.indexOf('Sun'), 1);
        startOfWeek = startOfWeek.slice(days.indexOf('Sun'));
      }
      // setThisWeeksCookieCiphers(startOfWeek);
    }
    if (cipherss[0].date_issued) {
      days = cipherss.map((cipher) => cipher.date_issued.slice(0, 3)).slice(-7);
      lastSevenDays = cipherss.slice(-7);
      const sevenDays = days.slice(-7);
      startOfWeek = lastSevenDays.slice(lastSevenDays.length > 7 ? sevenDays.indexOf('Sun') : 0);
      if (days.slice(days.indexOf('Sun')).includes('Sun')) {
        // startOfWeek.splice(days.indexOf('Sun'), 1);
        startOfWeek = startOfWeek.slice(days.indexOf('Sun'));
      }
      const result = thisWeeksCookieCiphers.filter((cipher, i) => cipher.gameDate === startOfWeek[i].date_issued);
      setThisWeeksCookieCiphers(result);
      setThisWeeksCiphers(startOfWeek);
    }
    return startOfWeek;
  }

  if (!cipherCookies) {
    cipherCookies = cookies && getThisWeeksCiphers(cookies.timeHistory);
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
    console.log(played);
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

  useEffect(() => {
    if (levelSwapped) {
      getCookies()
        .then((data) => {
          cipherCookies = cookies && getThisWeeksCiphers(data.data.userData.timeHistory);
          setCookies(data.data.userData);
        });
    }
    setLevelSwapped(false);
  }, [levelSwapped]);
  if (!downloadURL && safe < 1) {
    if (victory || gameover) {
      setTimeout(() => {
        if (document.getElementById('download-container')) {
          getShareDownload().then((url) => {
            safe = 0;
            setDownloadURL(url);
          });
        }
      }, 600);
      safe += 1;
    } else if (played) {
      setTimeout(() => {
        if (document.getElementById('download-container')) {
          getShareDownload().then((url) => {
            safe = 0;
            setDownloadURL(url);
          });
        }
      }, 600);
      safe += 1;
    }
  }

  return (
    <div id="container">
      <div id="nav-body">
        <div id="timer-bo">
          {skipped ? (
            <Suspense fallback={(
              <div />
                      )}
            >
              <Timer
                setFinalTime={setFinalTime}
                gameover={gameover}
                victory={victory}
                drawerOpened={drawerOpened}
                howtoplaybuttonclick={howToPlayButtonClick}
                levelSwapped={levelSwapped}
                setLevelSwapped={setLevelSwapped}
                disableTimer={disableTimer}
              />
            </Suspense>
          ) : null}
        </div>
        <div id="health-body">
          <Suspense fallback={(
            <div />
          )}
          >
            <Health healthbar={health} />

          </Suspense>
        </div>

      </div>
      <div id="header-container">
        <h4 id="header">Ciphrase</h4>
        <div>
          {text && (
          <Suspense fallback={(
            <div />
                      )}
          >
            <Level level={level} />
          </Suspense>
          )}
        </div>
      </div>
      {((!skipped && text && level > 0) && !levelSwapped) || howToPlayButtonClick ? (
        <>
          <Suspense fallback={(
            <div />
          )}
          >

            <Howtoplay
              setHowToPlayButtonClick={setHowToPlayButtonClick}
              setSkipped={setSkipped}
              cookieData={cookies}
              played={played}
              setPlayed={setPlayed}
              text={text}
              downloadURL={downloadURL}
              level={level}
              skipped={skipped}
              setReload={setReload}
              disableTimer={disableTimer}
              setDisableTimer={setDisableTimer}
              date={date}
            />
          </Suspense>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <div
            id="htp-bg"
          />
          {!played ? (
            <div
              className="modal-bg"
              id="modal-bg"
              onClick={() => { setSkipped(true); setHowToPlayButtonClick(false); }}
              tabIndex="0"
              label="modal"
              role="button"
            >
              <img src={loading} id="loading-wheel" alt="loading wheel" width="100px" height="100px" />
            </div>
          ) : (
            <div
              className="modal-bg"
              id="finish-modal-bg"
            >
              <img src={loading} id="loading-wheel" alt="loading wheel" width="100px" height="100px" />
            </div>
          )}
        </>
      ) : null}
      {levelSwapped ? (
        <>
          <Suspense fallback={(
            <div />
          )}
          >

            <Howtoplay
              setSkipped={setSkipped}
              cookieData={cookies}
              played={played}
              setPlayed={setPlayed}
              text={text}
              skipped={skipped}
              downloadURL={downloadURL}
              level={level}
              setReload={setReload}
              date={date}
            />
          </Suspense>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <div
            id="htp-bg"
          />
          {!played ? (
            <div
              className="modal-bg"
              id="modal-bg"
              onClick={() => {
                setSkipped(true);
                if (howToPlayButtonClick) {
                  setHowToPlayButtonClick(false);
                }
              }}
              tabIndex="0"
              label="modal"
              role="button"
            >
              <img src={loading} id="loading-wheel" alt="loading wheel" width="100px" height="100px" />
            </div>
          ) : (
            <div
              className="modal-bg"
              id="finish-modal-bg"
            >
              <img src={loading} id="loading-wheel" alt="loading wheel" width="100px" height="100px" />
            </div>
          )}
        </>
      ) : null}
      {gameover && finalTime && (
      <>
        <Suspense fallback={(
          <div />
          )}
        >
          <Gameover
            level={level}
            percent={percent}
            finalTime={finalTime}
            text={text}
            health={health}
            attempts={attempts}
            date={date || utc.toDateString()}
            cookies={cookies}
            id="gameover"
            setReload={setReload}
            downloadURL={downloadURL}
            mutation={mutation}
          />

        </Suspense>
        <div className="modal-bg" id="finish-modal-bg">
          <img src={loading} id="loading-wheel" alt="loading wheel" width="100px" height="100px" />
        </div>
      </>
      )}
      {victory && finalTime && (
      <>
        <Suspense fallback={(
          <div />
          )}
        >

          <Victory
            level={level}
            percent={percent}
            time={finalTime}
            health={health}
            attempts={attempts}
            date={date || utc.toDateString()}
            cookies={cookies}
            setReload={setReload}
            downloadURL={downloadURL}
            text={text}
          />
        </Suspense>
        <div id="modal-bg">
          <img src={loading} id="loading-wheel" alt="loading wheel" width="100px" height="100px" />
        </div>
      </>
      )}
      {(victory || gameover) && finalTime && (
        <Suspense fallback={(
          <div />
          )}
        >
          <RewardingEncouragement
            attempts={attempts}
            gameover={gameover}
            encouragement={encouragement}
            setEncouragement={setEncouragement}
          />
        </Suspense>
      )}
      <Suspense fallback={(
        <div />
          )}
      >

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
          setHowToPlayButtonClick={setHowToPlayButtonClick}
          setDisableTimer={setDisableTimer}
          setGameover={setGameover}
          setVictory={setVictory}
          setHardMode={setHardMode}
          setEncouragement={setEncouragement}
          thisWeeksCookieCiphers={thisWeeksCookieCiphers}
        />
      </Suspense>
      <div id="body-container-pc">
        <div id={window.innerWidth > 850 ? 'ciphered-body' : 'ciphered-body-mobile'}>
          {skipped && (
          <>
            {
              !hardMode && attempts.map((attempt, index) => (
                <Suspense fallback={(
                  <div />
                )}
                >

                  <Attempts
                    attempt={attempt}
                    margin={index * 5}
                    text={text}
                    index={attempts.length - index}
                    opened={drawerOpened}
                    ciphertext={ciphertext}
                    mutation={mutation}
                  />
                </Suspense>
              ))
            }
            <div>
              <Suspense fallback={(
                <div />
          )}
              >

                <Cipher
                  text={text}
                  gameover={gameover}
                  level={level}
                  mutation={mutation}
                  setMutationCiphers={setMutationCiphers}
                  mutationCiphers={mutationCiphers}
                  opened={drawerOpened}
                  setCiphertext={setCiphertext}
                />
              </Suspense>
            </div>
          </>
          )}
        </div>
        <div id="input-body">
          <Suspense fallback={(
            <div />
          )}
          >

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
          </Suspense>
        </div>
      </div>
    </div>
  );
}
