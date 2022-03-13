const mongoose = require('mongoose');

// Generates a new schema for the Cipher model.
const schema = new mongoose.Schema({
  date_issued: Date,
  text: String,
  level_type: String,
});

// Creates a new Cipher entity in the mongo DB
const Cipher = mongoose.model('Cipher', schema);

/**
 * @func addCipher adds a newly generated cipher to the database.
 * @param {*} cipher is the newly generated cipher instance created in the server app.js file.
 */
const addCipher = async (cipher) => {
  const foundDupe = await Cipher.findOne({ where: cipher.text }).catch((err) => console.error(err));

  const newCipher = new Cipher(cipher);
  if (!foundDupe.length) {
    await newCipher.save();
  }
};

// TODO: remove uneeded ciphers from DB for cleanup.
const removeCipher = () => null;

/**
 * @func getCipher retrieves a cipher based on the current date or all ciphers in db.
 * @param {*} date today's date.
 * @param {*} all boolean that dictates if all ciphers should be retrieved from db.
 * @returns retrieved cipher object.
 */
const getCipher = async (date, all = false) => {
  if (all) {
    const ciphers = await Cipher.find().catch((err) => console.error(err));
    return ciphers;
  }
  const todayCipher = await Cipher.findOne({ where: date }).catch((err) => console.error(err));

  return todayCipher;
};

module.exports = {
  addCipher,
  removeCipher,
  getCipher,
};
