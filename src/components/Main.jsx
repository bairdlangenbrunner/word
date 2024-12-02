import { useState } from "react";
import { people as peopleFromJSON } from "../people";
import Header from "./Header";
import clsx from "clsx";

export default function Main() {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [currentWord, setCurrentWord] = useState("react");
  const nAttempts = currentWord.length;
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [people, setPeople] = useState(() =>
    shuffle(peopleFromJSON).slice(0, nAttempts)
  );
  const [guessedLetters, setGuessedLetters] = useState([]);

  // map over the people you just chose
  const peopleElements = people.map((person) => (
    <span className="person-tile" key={person.name}>
      {person.symbol}
    </span>
  ));

  const letterElements = currentWord.split("").map((letter) => (
    <span className="letter-tile" key={crypto.randomUUID()}>
      {letter.toUpperCase()}
    </span>
  ));

  const keyboardElements = alphabet.split("").map((letter) => {
    // const classNameFull = guessedLetters.includes(letter)
    //   ? currentWord.split("").includes(letter)
    //     ? "keyboard-tile letter-correct"
    //     : "keyboard-tile letter-incorrect"
    //   : "keyboard-tile";
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = currentWord.includes(letter);
    const classNameFull = clsx("keyboard-tile", {
      "letter-correct": isGuessed && isCorrect,
      "letter-incorrect": isGuessed && !isCorrect,
    });
    // console.log(classNameFull)
    return (
      <button
        className={classNameFull}
        key={letter}
        onClick={() => handleLetterClick(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  function handleLetterClick(letter) {
    setGuessedLetters((prevGuessedLetters) =>
      prevGuessedLetters.includes(letter)
        ? prevGuessedLetters
        : [...prevGuessedLetters, letter]
    );
    // console.log("guessed letter " + letter);
    // console.log(guessedLetters);
  }

  return (
    <div className="main-div">
      <div className="header-div">
        <Header nAttempts={nAttempts} />
      </div>

      <div className="status-div">
        <h2>you win!</h2>
        <p>well done</p>
      </div>

      <div className="people-div">{peopleElements}</div>

      <div className="letters-div">{letterElements}</div>

      <div className="keyboard-div">{keyboardElements}</div>

      <div className="new-game-div">
        <button className="new-game-button">new game</button>
      </div>
    </div>
  );
}
