import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      numberGuessLeft: 11,
      // Insert form input state here
      currGuess: "",
      playerWon: false,
      isGameEnd: false,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];

    if (this.state.isGameEnd && !this.state.playerWon) {
      for (let letter of this.state.currWord) {
        wordDisplay.push(letter);
      }
    } else {
      // for...of is a string and array iterator that does not use index
      for (let letter of this.state.currWord) {
        if (this.state.guessedLetters.includes(letter)) {
          wordDisplay.push(letter);
        } else {
          wordDisplay.push("_");
        }
      }
    }
    return wordDisplay.toString();
  };

  componentDidUpdate() {
    let word = this.generateWordDisplay();

    // Need to account for 3 scenarios
    // 1. user has guessed finish 10 tries: LOSE
    // 2. user guessed the word in 10 tries: WIN
    if (!this.state.isGameEnd && !this.state.playerWon) {
      if (
        this.state.numberGuessLeft === 1 &&
        word.split(",").join("") === this.state.currWord
      ) {
        // Player won at last try
        this.setState({
          isGameEnd: true,
          playerWon: true,
        });
      } else if (
        this.state.numberGuessLeft !== 0 &&
        word.split(",").join("") === this.state.currWord
      ) {
        // Player won before last try
        this.setState({
          isGameEnd: true,
          playerWon: true,
        });
      } else if (this.state.numberGuessLeft === 1) {
        // Player did not guess the word in 10 tries
        this.setState({
          isGameEnd: true,
          playerWon: false,
        });
      }
    }
  }

  // Insert form callback functions handleChange and handleSubmit here
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.guessedLetters.includes(this.state.currGuess)) {
      alert("This letter has already been guessed, try another letter. ");
      this.setState({
        currGuess: "",
      });
    } else {
      this.setState({
        guessedLetters: [...this.state.guessedLetters, this.state.currGuess],
        currGuess: "",
        numberGuessLeft: this.state.numberGuessLeft - 1,
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      currGuess: event.target.value,
    });
  };

  handleRestart = () => {
    this.setState({
      currWord: getRandomWord(),
      guessedLetters: [],
      numberGuessLeft: 11,
      currGuess: "",
      playerWon: false,
      isGameEnd: false,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.generateWordDisplay()}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          {/* Insert form element here */}
          {this.state.isGameEnd && !this.state.playerWon && (
            <>
              <p>Sorry, you ran out of guesses :(</p>
              <button type="button" onClick={this.handleRestart}>
                Play again!
              </button>
            </>
          )}
          {this.state.isGameEnd && this.state.playerWon && (
            <>
              <p>You guessed it!</p>
              <button type="button" onClick={this.handleRestart}>
                Play again!
              </button>
            </>
          )}

          <h3>Input</h3>

          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Enter a letter here"
              value={this.state.currGuess}
              onChange={this.handleChange}
              maxLength={1}
              required
              disabled={this.state.isGameEnd && true}
            ></input>
            <input
              type="submit"
              disabled={this.state.isGameEnd && true}
            ></input>
          </form>

          <p> Number of Guesses Left: {this.state.numberGuessLeft - 1}</p>
        </header>
      </div>
    );
  }
}

export default App;
