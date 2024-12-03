import { useState, useEffect } from "react";
import { people as peopleFromJSON } from "../people";
import { shuffle, generateWord } from "../utils/utils";
import clsx from "clsx";
import Header from "./Header";

const N_PEOPLE = 5;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export default function Main() {
  const [wordLength, setWordLength] = useState(5);
  const [currentWord, setCurrentWord] = useState(generateWord(wordLength));
  const [people, setPeople] = useState(() =>
    shuffle(peopleFromJSON).slice(0, N_PEOPLE)
  );
  const [guessedLetters, setGuessedLetters] = useState([]);

  // derived state
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameLost = wrongGuessCount === N_PEOPLE;
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
  const keyboardElements = ALPHABET.split("").map((letter) => (
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
      deadPeople.length === N_PEOPLE - 1 ? (
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
    setCurrentWord(generateWord(wordLength));
    setPeople(shuffle(peopleFromJSON).slice(0, N_PEOPLE));
    setGuessedLetters([]);
  }

  function renderGameStatus() {
    if (isGameWon) {
      return (
        <>
          <h2>you win!</h2>
          <p>well done</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>you lost!</h2>
          <p>all your people are dead :(</p>
        </>
      );
    }
    return <p className="dead-people-text">{youKilledText}</p>;
  }

  const wordLengthOptions = Array.from({ length: 8 }, (_, i) => 5 + i); // [5, 6, ..., 12]

  return (
    <div className="main-div">
      <div className="header-div">
        <Header nAttempts={N_PEOPLE} />
      </div>

      {/* game status (win, lose, killed, blank) */}
      <div className={gameStatusClass}>{renderGameStatus()}</div>

      {/* people icons */}
      <div className="people-div">{peopleElements}</div>

      {/* letters */}
      <div className="letters-div">{letterElements}</div>

      {/* keyboard */}
      <div className="keyboard-div">{keyboardElements}</div>

      {/* word length selector and new game button */}
      <div className="game-controls-div">
        <div className="word-length-div">
          <label htmlFor="wordLength">set word length</label>
          <select
            id="wordLength"
            name="wordLength"
            onChange={handleWordLengthChange}
            value={wordLength}
            defaultValue="5"
          >
            {wordLengthOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
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
