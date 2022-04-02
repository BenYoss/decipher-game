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
  if (letter === letter.toUpperCase()) {
    regexCase = new RegExp(letter.toLowerCase(), 'g');
  } else {
    regexCase = new RegExp(letter.toUpperCase(), 'g');
  }
  const regex = new RegExp(letter, 'g');
  // Randomizes text ⬇⬇⬇
  // result = text.replace(regex, alphabet[Math.floor(Math.random()
  //   * alphabet.length - 1)].toUpperCase());
  result = text.replace(regex, replacement);
  result = result.replace(regexCase, replacement.toUpperCase());
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
  const regex = new RegExp(letter, 'g');
  const scrambler = [];
  for (let i = 0; i < amount; i += 1) {
    // Randomizes the text ⬇⬇⬇
    // scrambler.push(alphabet[Math.floor(Math.random() * alphabet.length - 1)]);
    scrambler.push(replacement);
  }
  return text.replace(regex, scrambler.join(''));
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
export function countDown(time) {
  if (!counter) {
    counter = setInterval(() => {
      mil += 1;
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
    }, 10);
  }
}

export function stopCount() {
  clearInterval(counter);
}

export async function updateCookies(time, attempts, isWin, cipherAttempts) {
  await axios.post('/setcookie', {
    time, attempts, isWin, cipherAttempts,
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
  let attemptCount = 1;

  attempts.forEach((attempt) => {
    if (!attempt.open) {
      attemptCount += 1;
    }
  });

  return attemptCount;
}

let count = 0;

export async function getShareDownload() {
  if (count < 1) {
    const elt = document.getElementById('download-container');
    return html2canvas(elt).then((canvas) => {
      document.body.appendChild(canvas);

      const canvas2 = document.getElementsByTagName('canvas')[0];
      const dataURL = canvas2.toDataURL();
      count += 1;
      return dataURL;
    });
  }
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
