/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-return-await */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import axios from 'axios';
import html2canvas from 'html2canvas';

// ALPHABET DATA REFERENCE
// const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/**
 * @func FlipLetters flips a random letter in string.
 * @param {*} text
 * @param {*} letter
 * @returns
 */
export function flipLetters(text, letter, replacement) {
  let regexCase;
  let result;
  let caseChangedChar = '';
  let replace = replacement;
  if (letter === letter.toUpperCase()) {
    regexCase = new RegExp(letter.toLowerCase(), 'g');
    caseChangedChar = replacement.toLowerCase();
    replace = replacement.toUpperCase();
  } else {
    regexCase = new RegExp(letter.toUpperCase(), 'g');
    caseChangedChar = replacement.toUpperCase();
  }
  const regex = new RegExp(letter, 'g');
  // Randomizes text ⬇⬇⬇
  // result = text.replace(regex, alphabet[Math.floor(Math.random()
  //   * alphabet.length - 1)].toUpperCase());
  result = text.replace(regex, replace);
  result = result.replace(regexCase, caseChangedChar);
  // Randomizes text ⬇⬇⬇
  // result = text.replace(regex, alphabet[Math.floor(Math.random() * alphabet.length - 1)]);
  return result;
}

/**
 * @func reverseText reverses the text of a string.
 * @param {*} text
 * @returns
 */
export function reverseText(text) {
  return text.split('').reverse().join('');
}

export function addMoreText(text, letter, amount, replacement) {
  let regexCase;
  let result;
  let caseChangedChar = '';
  let replace = replacement;
  let scrambler = [];
  for (let i = 0; i < amount; i += 1) {
    // Randomizes the text ⬇⬇⬇
    // scrambler.push(alphabet[Math.floor(Math.random() * alphabet.length - 1)]);
    scrambler.push(replacement);
  }
  scrambler = scrambler.join('');
  if (letter === letter.toUpperCase()) {
    regexCase = new RegExp(letter.toLowerCase(), 'g');
    caseChangedChar = scrambler.toLowerCase();
    replace = scrambler.toUpperCase();
  } else {
    regexCase = new RegExp(letter.toUpperCase(), 'g');
    caseChangedChar = scrambler.toUpperCase();
    replace = scrambler;
  }
  const regex = new RegExp(letter, 'g');
  result = text.replace(regex, replace);
  result = result.replace(regexCase, caseChangedChar);
  return result;
}

/**
 * @func mutate is the main function that chooses a function
 * above randomly to mutate base string.
 * @param {*} text
 * @param {*} cycleCount
 * @returns
 */
export function mutate(text, cycleCount) {
  let newtext = text;
  if (cycleCount > 0) {
    const randomVal = Math.floor(Math.random() * 10);
    if (randomVal <= 4) {
      newtext = flipLetters(text, text[Math.floor(Math.random() * text.length - 1)]);
    } else if (randomVal > 4 && randomVal <= 8) {
      newtext = reverseText(text);
    } else if (randomVal > 8 <= 10) {
      newtext = addMoreText(
        text,
        text[Math.floor(Math.random() * text.length - 1)],
        Math.floor(Math.random() * cycleCount + 1),
      );
    }
    return mutate(newtext, cycleCount - 1);
  }
  // Base-case for function
  if (cycleCount === 0) {
    return newtext;
  }
}

// time incrementors.
let hour = 0;
let min = 0;
let sec = 0;
let mil = 0;
let counter;

/**
 * @func CountDown is a timer algorithm that acts as a stopwatch
 * counting up from miliseconds to hours.
 * @param {*} time stateful component method that updates the timer state in the App component.
 */
export function countDown(time = '00:00:00:00', opened = false, levelSwapped = false, setLevelSwapped = () => { }) {
  if (levelSwapped) {
    hour = 0;
    min = 0;
    sec = 0;
    mil = 0;
    setLevelSwapped(false);
  }
  if (!counter) {
    counter = setInterval(() => {
      mil += 2;
      if (mil === 100) {
        mil = 0;
        sec += 1;
      }
      if (sec === 60) {
        sec = 0;
        min += 1;
      }
      if (min === 60) {
        min = 0;
        hour += 1;
      }
      const hourStr = hour > 9 ? hour : `0${hour}`;
      const minStr = min > 9 ? min : `0${min}`;
      const secStr = sec > 9 ? sec : `0${sec}`;
      const milStr = mil > 9 ? mil : `0${mil}`;
      time(`${hourStr}:${minStr}:${secStr}:${milStr}`);
    }, 20);
  } else if (opened) {
    clearInterval(counter);
    counter = undefined;
  }
}

// Timer starter for the countdown until the next ciphrase
let nextCipherTime;
export function startTimer(duration, display) {
  // If there is no interval initialized a new one will be made
  if (!nextCipherTime) {
    const timer = duration.split(':'); let minutes; let
      seconds; let hours;
    hours = parseInt(timer[0], 10);
    minutes = parseInt(timer[1], 10);
    seconds = parseInt(timer[2], 10);
    nextCipherTime = setInterval(() => {
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      display.textContent = `${hours}:${minutes}:${seconds}`;
      if (seconds >= 0) {
        seconds -= 1;
      }
      if (seconds < 0 && minutes > 0) {
        minutes -= 1;
        seconds = 59;
      }
      if (minutes < 0 && hours > 0) {
        hours -= 1;
        minutes = 59;
      }
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);
      seconds = parseInt(seconds, 10);
    }, 1000);
  }
}
export function stopCount() {
  clearInterval(counter);
}

export function clearCount() {
  hour = 0;
  min = 0;
  sec = 0;
  mil = 0;
  clearInterval(counter);
  clearInterval(nextCipherTime);
  clearInterval(nextCipherTime);
  nextCipherTime = undefined;
  counter = undefined;
}

export async function updateCookies(date, time, attempts, isWin, cipherAttempts) {
  await axios.post('/setcookie', {
    date, time, attempts, isWin, cipherAttempts,
  });
}

export async function getCookies() {
  const cookieData = await axios.get('/getcookie');
  return cookieData;
}

export async function getCiphersFromDB() {
  const result = await axios.get('/getcipher');
  return result;
}

// Function to count the number of attempts a player makes to complete Cipher.
export function getAttemptCount(attempts) {
  let attemptCount = 0;

  attempts.forEach((attempt) => {
    if (!attempt.open) {
      attemptCount += 1;
    }
  });

  return attemptCount;
}

let count = 0;

export async function getShareDownload() {
  const elt = document.getElementById('download-container');
  let canvases;
  return html2canvas(elt, { scale: 5 }).then((canvas) => {
    if (!document.getElementsByTagName('canvas').length) {
      document.body.appendChild(canvas);
    } else {
      canvases = document.getElementsByTagName('canvas');
      document.body.replaceChild(canvas, document.getElementsByTagName('canvas')[canvases.length - 1] || document.getElementsByTagName('canvas')[0]);
    }
    const canvas2 = canvases ? document.getElementsByTagName('canvas')[canvases.length - 1] : document.getElementsByTagName('canvas')[0];
    const dataURL = canvas2.toDataURL();
    count += 1;
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1');
    return dataURL;
  });
}

// updates cookie attempts
export async function updateAttempts(attempt, text) {
  const words = text.split(' ');
  const attemptWords = attempt.split(' ');
  const attemptResults = [];
  words.forEach((word, index) => {
    if (!attemptWords[index] || attemptWords[index] !== word) {
      attemptResults.push(false);
    } else {
      attemptResults.push(true);
    }
  });
  return attemptResults;
}
// * Copies the user stats image for sharing.
export function copyToClipboard(downloadURL) {
  // Clipboard permissions to allow for copy.
  // Conditional checks to see if clipboard components exist during the state.
  if (typeof ClipboardItem && navigator.clipboard.write) {
    // Invoke and initialize clipboard item.
    const image = new ClipboardItem({
      'image/png': fetch(downloadURL)
        .then((response) => response.blob()),
    });
    // Clipboard copy
    navigator.clipboard.write([image]);
    // Share feature (Does not work at the moment)
    return fetch(downloadURL)
      .then((response) => response.blob())
      .then((blob) => {
        navigator.share({
          files: [new File([blob], 'Ciphrase Stats.png', { type: 'image/png' })],
        });
        return true;
      }).catch((err) => console.error(err));
  }
  return false;
}
