/* eslint-disable no-restricted-syntax */
const { Router } = require('express');
const fsPromise = require('fs').promises;
const { addCipher, getCipher } = require('../db/cipher');
const mutations = require('./mutations.json');

const app = Router();

const usedChars = [];

const findRandomCharInText = (text) => {
  const invalidChars = ' 1234567890,-';
  let isValidChar = false;
  let randomChar;
  while (!isValidChar) {
    const randomInt = Math.floor(Math.random() * text.length);
    randomChar = text[randomInt];
    if (!invalidChars.includes(randomChar) && !usedChars.includes(randomChar)) {
      isValidChar = true;
    }
  }
  usedChars.push(randomChar);
  return randomChar;
};

// Cipher builder for automatically creating ciphers each day.
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const makeMutationPrint = (text, level, mutation = '') => {
  let resultStr = '';

  // For categorizing mutations based on level.
  const i = Math.floor(Math.random() * 3);
  if (level >= mutations[i].minLevel) {
    resultStr = resultStr.concat(mutations[i].mutation);

    // Determines a random char from idiom to use in mutation.
    if (i < 2) {
      // if reversal mutation is already used, recursively cycle to find a new cipher.
      if (i === 1 && mutation.includes('r-')) {
        return makeMutationPrint(text, level, mutation);
      }
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      resultStr = resultStr.concat(findRandomCharInText(text) + randomChar);
      alphabet.splice(randomChar, 1);
    } else {
      const randomAmount = Math.floor(Math.random() * 3) || 1;
      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      resultStr = resultStr.concat(`${findRandomCharInText(text)}${randomAmount}${randomChar}`);
      alphabet.splice(randomChar, 1);
    }
  }
  return resultStr;
};

/**
 * @func buildCipherEntry builds a new cipher object based on the incoming text.
 * @param {*} textData is the incoming text fetched from the ciphers.txt doc.
 * @returns cipher object
 */
const now = new Date(); const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

const buildCipherEntry = (textData, dbCiphers) => {
  const entryObject = {};
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const seeded = dbCiphers;
  entryObject.id = `${Number(dbCiphers[dbCiphers.length - 1] ? dbCiphers[dbCiphers.length - 1].id : 0) + 1 || 1}`;
  entryObject.dateIssued = utc.toDateString();

  days.forEach((day, i) => {
    if (entryObject.dateIssued.includes(day)) {
      entryObject.levelType = i + 1;
    }
  });

  for (let i = 0; i < textData.length; i += 1) {
    if (textData[i].length < 100 / entryObject.levelType) {
      entryObject.text = textData[i];
      entryObject.mutation = makeMutationPrint(
        entryObject.text,
        entryObject.levelType,
        entryObject.mutation,
      );
      let j = 1;
      while (j < entryObject.levelType) {
        entryObject.mutation += `|${makeMutationPrint(entryObject.text, entryObject.levelType)}`;
        j += 1;
      }
      break;
    }
  }
  let bool = true;
  for (let j = 0; j < seeded.length; j += 1) {
    if (entryObject.text === seeded[j].text) {
      bool = false;
      const startpoint = textData.indexOf(entryObject.text);
      const endpoint = startpoint + entryObject.text.length - 1;
      textData.splice(endpoint.text, 1);
      // recursively iterates until a unique string is met.
      return buildCipherEntry(textData, dbCiphers);
    }
  }

  if (bool) {
    // base case for function to return cipher instance.
    return entryObject;
  }
  return null;
};

/**
 * @func saveCipher saves a new cipher instance in the seed.json file.
 * @param {*} cipher is the completed cipher object.
 * @returns cipher object after saved.
 */
const saveCipher = async (cipher, dbCiphers) => {
  const seeded = dbCiphers;
  let bool = true;

  // For checking if the text already exists in cipher.json
  for (let i = 0; i < seeded.length; i += 1) {
    if (seeded[i].text === cipher.text) {
      bool = false;
    }
  }

  // If cipher text is unique, it gets added to the JSON file!
  if (bool) {
    addCipher(cipher);
  }

  return cipher;
};

/**
 * @func readFile reads from the text file and extracts data.
 * @param {*} file is the data extracted from the text file
 * @returns cipher object once it's saved into the JSON file.
 */

const readFile = async (file, dbCiphers) => fsPromise.readFile(file, 'utf-8', (err) => {
  if (err) {
    console.error(err);
  }
}).then((data) => {
  const cipher = buildCipherEntry(data.split('\n'), dbCiphers);
  if (cipher) {
    return saveCipher(cipher, dbCiphers);
  }
  // prints an error if no idiom is found in list.
  console.error('MissingIdiomException: Idiom list is empty, please refill.');
  return null;
});

app.get('/addcipher', (req, res) => {
  getCipher('', true)
    .then((ciphers) => {
      readFile('data/ciphers.txt', ciphers).then((data) => {
        res.send(data);
      });
    });
});

app.get('/getcipher', (req, res) => {
  if (req.query.dateIssued) {
    getCipher(req.query.dateIssued)
      .then((cipher) => {
        res.send(cipher);
      });
  } else {
    getCipher('', true)
      .then((ciphers) => {
        res.send(ciphers);
      });
  }
});

module.exports = app;
