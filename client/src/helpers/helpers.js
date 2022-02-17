/* eslint-disable consistent-return */
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function flipLetters(text, letter) {
  const regex = new RegExp(letter, 'g');
  let result;
  if (letter && letter === letter.toUpperCase()) {
    result = text.replace(regex, alphabet[Math.floor(Math.random()
      * alphabet.length - 1)].toUpperCase());
  } else {
    result = text.replace(regex, alphabet[Math.floor(Math.random() * alphabet.length - 1)]);
  }
  return result;
}

export function reverseText(text) {
  return text.split('').reverse().join('');
}

export function addMoreText(text, letter, amount) {
  const regex = new RegExp(letter, 'g');
  const scrambler = [];
  for (let i = 0; i < amount; i += 1) {
    scrambler.push(alphabet[Math.floor(Math.random() * alphabet.length - 1)]);
  }
  return text.replace(regex, scrambler.join(''));
}

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
  if (cycleCount === 0) {
    return newtext;
  }
}
