import { useState } from "react";
import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";
import { randomWord, ENGLISH_WORDS } from "./words";
import Button from "./Button.jsx";


/** Snowman game: plays hangman-style game with a melting snowman.
 *
 * Props:
 * - maxWrong: how many wrong moves is a player allowed?
 * - images: array of images for wrong guess
 * - words: array of words to pick answer from
 *
 * State:
 * - nWrong: # wrong guesses so far
 * - guessedLetters: set of guessed letters (good and bad) so far
 * - answer: selected secret word*
 */

function Snowman({
  images = [img0, img1, img2, img3, img4, img5, img6],
  words = ENGLISH_WORDS,
  maxWrong = 6,
}) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const [nWrong, setNWrong] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(() => new Set());
  const [answer, setAnswer] = useState(randomWord(words));

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  function guessedWord() {
    return answer
      .split("")
      .map(ltr => (guessedLetters.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  function handleGuess(evt) {
    let ltr = evt.target.value;

    setGuessedLetters(g => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    setNWrong(n => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        className={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessedLetters.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** restartGame: reset game states for a new game. */
  function restartGame() {
    setNWrong(0);
    setGuessedLetters(new Set());
    setAnswer(randomWord(words));
  }

  const won = guessedWord().join("") === answer;

  return (
    <div className="Snowman">
      <img src={(images)[nWrong]} alt={nWrong} />
      <p>Number wrong: {nWrong}</p>
      <p className="Snowman-word">{guessedWord()}</p>
      {nWrong < maxWrong && !won && <p>{generateButtons()}</p>}
      {nWrong >= maxWrong && <p>You lose! The word was {answer}.</p>}
      {won && <p>You win!</p>}
      <Button label="Start a new ☃️ game!" click={restartGame} />
    </div>
  );
}


export default Snowman;
