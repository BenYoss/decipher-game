/* eslint-disable consistent-return */

// ALPHABET DATA REFERENCE
// const alphabet = 'abcdefghijklmnopqrstuvwxyz';

/**
 * @func FlipLetters flips a random letter in string.
 * @param {*} text
 * @param {*} letter
 * @returns
 */
export function flipLetters(text, letter, replacement) {
  const regex = new RegExp(letter, 'g');
  let result;
  if (letter && letter === letter.toUpperCase()) {
    // Randomizes text ⬇⬇⬇
    // result = text.replace(regex, alphabet[Math.floor(Math.random()
    //   * alphabet.length - 1)].toUpperCase());
    result = text.replace(regex, replacement.toUpperCase());
  } else {
    result = text.replace(regex, replacement);
    // Randomizes text ⬇⬇⬇
    // result = text.replace(regex, alphabet[Math.floor(Math.random() * alphabet.length - 1)]);
  }
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
