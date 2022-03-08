/* eslint-disable no-restricted-syntax */
const { Router } = require('express');
const fs = require('fs');
const fsPromise = require('fs').promises;
const seed = require('../../data/seed.json');
const mutations = require('./mutations.json');

const app = Router();

// Cipher builder for automatically creating ciphers each day.

const makeMutationPrint = (text, level) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let resultStr = '';

  // For categorizing mutations based on level.
  for (let i = 0; i < mutations.length; i += 1) {
    if (level >= mutations[i].minLevel) {
      resultStr = resultStr.concat(mutations[i].mutation);

      // Determines a random char from idiom to use in mutation.
      if (i === 0) {
        const randomTextChar = text[Math.floor(Math.random() * text.length - 1)];
        const randomChar = alphabet[Math.floor(Math.random() * alphabet.length - 1)];
        resultStr = resultStr.concat(randomTextChar + randomChar);
      }
      if (i === 2) {
        const randomAmount = Math.floor(Math.random() * 3);
        const randomTextChar = text[Math.floor(Math.random() * text.length - 1)];
        const randomChar = alphabet[Math.floor(Math.random() * alphabet.length - 1)];
        resultStr = resultStr.concat(`${randomTextChar}${randomAmount}${randomChar}`);
      }

      // break statement once mutation is created.
      break;
    }
  }
  return resultStr;
};

/**
 * @func buildCipherEntry builds a new cipher object based on the incoming text.
 * @param {*} textData is the incoming text fetched from the ciphers.txt doc.
 * @returns cipher object
 */
const buildCipherEntry = (textData) => {
  const entryObject = {};
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  entryObject.id = `${Number(seed[seed.length - 1].id) + 1 || 1}`;
  entryObject.dateIssued = new Date().toDateString();

  days.forEach((day, i) => {
    if (entryObject.dateIssued.includes(day)) {
      entryObject.levelType = i + 1;
    }
  });

  for (let i = 0; i < textData.length; i += 1) {
    if (textData[i].length < 100 / entryObject.levelType) {
      entryObject.text = textData[i];
      entryObject.mutation = makeMutationPrint(entryObject.text, entryObject.levelType);
      break;
    }
  }
  return entryObject;
};

/**
 * @func saveCipher saves a new cipher instance in the seed.json file.
 * @param {*} cipher is the completed cipher object.
 * @returns cipher object after saved.
 */
const saveCipher = async (cipher) => {
  const seeded = seed;
  let bool = true;

  // For checking if the text already exists in cipher.json
  for (let i = 0; i < seeded.length; i += 1) {
    if (seeded[i].text === cipher.text) {
      bool = false;
    }
  }

  // If cipher text is unique, it gets added to the JSON file!
  if (bool) {
    seeded.push(cipher);
  }

  await fs.writeFile('data/seed.json', JSON.stringify(seeded), (err) => {
    if (err) console.error(err);
  });

  return cipher;
};

/**
 * @func readFile reads from the text file and extracts data.
 * @param {*} file is the data extracted from the text file
 * @returns cipher object once it's saved into the JSON file.
 */

const readFile = async (file) => fsPromise.readFile(file, 'utf-8', (err) => {
  if (err) {
    console.error(err);
  }
}).then((data) => {
  const cipher = buildCipherEntry(data.split('\n'));
  return saveCipher(cipher);
});

app.get('/addcipher', (req, res) => {
  readFile('data/ciphers.txt').then((data) => {
    res.send(data);
  });
});

module.exports = app;
