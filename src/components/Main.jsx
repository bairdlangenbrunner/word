import { useState, useEffect } from "react";
import { people as peopleFromJSON } from "../people";
import clsx from "clsx";
import { generate } from "random-words";
import Header from "./Header";

export default function Main() {
  // Shuffle array utility
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const nPeople = 5;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [wordLength, setWordLength] = useState(5);
  const [currentWord, setCurrentWord] = useState(
    generate({ minLength: wordLength, maxLength: wordLength })
  );
  const [people, setPeople] = useState(() =>
    shuffle(peopleFromJSON).slice(0, nPeople)
  );
  const [guessedLetters, setGuessedLetters] = useState([]);

  // derived state
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameLost = wrongGuessCount === nPeople;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameOver = isGameLost || isGameWon;
  const deadPeople = people.slice(0, wrongGuessCount);

  // generate people elements
  const peopleElements = people.map((person, index) => (
    <span
      className={clsx("person-tile", index < wrongGuessCount && "person-dead")}
      key={person.name}
    >
      {index < wrongGuessCount ? "💀" : person.symbol}
    </span>
  ));

  // generate letter tiles
  const letterElements = currentWord.split("").map((letter) => (
    <span className="letter-tile" key={crypto.randomUUID()}>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>
  ));

  // if you select a diff word length, reset game
  // clicking new game also still works for this
  useEffect(() => {
    resetGame(wordLength);
  }, [wordLength]);

  // generate keyboard
  const keyboardElements = alphabet.split("").map((letter) => (
    <button
      className={clsx("keyboard-tile", {
        "letter-correct":
          guessedLetters.includes(letter) && currentWord.includes(letter),
        "letter-incorrect":
          guessedLetters.includes(letter) && !currentWord.includes(letter),
        "game-over": isGameOver,
      })}
      key={letter}
      onClick={() => handleLetterClick(letter)}
      disabled={isGameOver}
    >
      {letter.toUpperCase()}
    </button>
  ));

  function handleLetterClick(letter) {
    setGuessedLetters((prevGuessed) =>
      prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter]
    );
  }

  const gameStatusClass = clsx(
    "status-div",
    isGameLost && "status-lost",
    isGameWon && "status-won"
  );

  function handleWordLengthChange(event) {
    const newWordLength = parseInt(event.target.value, 10); // convert to number
    setWordLength(newWordLength); // update word length
    resetGame(newWordLength); // reset game with new word length
  }

  const youKilledText =
    deadPeople.length > 0 ? (
      deadPeople.length === nPeople - 1 ? (
        <>
          you just killed the {deadPeople.at(-1).name}! : (
          <br />
          you only have the {people.at(-1).name} left
        </>
      ) : (
        `you just killed the ${deadPeople.at(-1).name}! : (`
      )
    ) : (
      ""
    );

  function resetGame(newWordLength = wordLength) {
    setCurrentWord(generate({ minLength: wordLength, maxLength: wordLength }));
    setPeople(shuffle(peopleFromJSON).slice(0, nPeople));
    setGuessedLetters([]);
  }

  return (
    <div className="main-div">
      <div className="header-div">
        <Header nAttempts={nPeople} />
      </div>

      <div className={gameStatusClass}>
        {isGameWon && (
          <>
            <h2>you win!</h2>
            <p>well done</p>
          </>
        )}
        {isGameLost && (
          <>
            <h2>you lost!</h2>
            <p>all your people are dead :(</p>
          </>
        )}
        {!isGameOver && <p className="dead-people-text">{youKilledText}</p>}
      </div>

      <div className="people-div">{peopleElements}</div>
      <div className="letters-div">{letterElements}</div>
      <div className="keyboard-div">{keyboardElements}</div>
      <div className="game-controls-div">
        <div className="word-length-div">
          <label htmlFor="wordLength">set word length</label>
          <select
            id="wordLength"
            name="wordLength"
            onChange={handleWordLengthChange}
          >
            <option value="5" selected>
              5
            </option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="new-game-div">
          <button className="new-game-button" onClick={resetGame}>
            new game
          </button>
        </div>
      </div>
    </div>
  );
}
