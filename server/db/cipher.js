const mongoose = require('mongoose');

// Generates a new schema for the Cipher model.
const schema = new mongoose.Schema({
  date_issued: String,
  text: String,
  level_type: String,
  mutation: String,
});

// Creates a new Cipher entity in the mongo DB
const Cipher = mongoose.model('Cipher', schema);

/**
 * @func addCipher adds a newly generated cipher to the database.
 * @param {*} cipher is the newly generated cipher instance created in the server app.js file.
 */
const addCipher = async (cipher) => {
  const foundDupe = await Cipher.findOne({ text: cipher.text }).catch((err) => console.error(err));

  const newCipher = new Cipher({
    date_issued: cipher.dateIssued,
    text: cipher.text,
    level_type: cipher.levelType,
    mutation: cipher.mutation,
  });
  if (!foundDupe) {
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
  const todayCipher = await Cipher.findOne({ date_issed: date }).catch((err) => console.error(err));

  return todayCipher;
};

module.exports = {
  addCipher,
  removeCipher,
  getCipher,
};
