import { generate } from "random-words";

// shuffle an array (used to randomize people)
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// generate a word
export function generateWord(length) {
  return generate({ minLength: length, maxLength: length });
}