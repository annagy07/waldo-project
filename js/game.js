class Game {
  constructor() {
    this.startScreen = document.getElementById("start-screen");
    this.preGameScreen = document.getElementById("pre-game-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("end-screen");
    // Creates two new players
    this.player1 = new Player(document.getElementById("player1name").value);
    this.player2 = new Player(document.getElementById("player2name").value);
    // Keep track of who is the current player
    this.currentPlayer = this.player1;
    // Array that holds all the search images
    this.searchImage = [
      "./images/search-img/ski-waldo.jpg",
      "./images/search-img/office-waldo.jpg",
      "./images/search-img/mall-waldo.jpg",
      "./images/search-img/beach-waldo.jpg",
      "./images/search-img/street-waldo.jpg",
    ];
    this.roundIndex = 1;
    this.roundsTotal = 3;

    // Set up the UI elements
    this.setupUI();
  }

  setupUI() {
    //Lets the Input be the player name value
    document.getElementById("player1name").addEventListener("change", (e) => {
      this.player1.name = e.target.value;
    });
    document.getElementById("player2name").addEventListener("change", (e) => {
      this.player2.name = e.target.value;
    });
    //Button Setup
    document.getElementById("start-button").addEventListener("click", () => {
      this.showPreStart(this.currentPlayer);
      console.log(this.currentPlayer);
    });
    document
      .getElementById("start-playing-button")
      .addEventListener("click", () => {
        this.startRound();
      });
    document.getElementById("restart-game").addEventListener("click", () => {
      location.reload();
    });
  }

  /************  TIMER  ************/

  updateTimerDisplay() {
    // Update the display for both players
    ["player1", "player2"].forEach((playerKey) => {
      const player = this[playerKey];
      const minutes = Math.floor(player.timer / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (player.timer % 60).toString().padStart(2, "0");
      document.getElementById(
        `${playerKey}-timer`
      ).textContent = `${player.name}'s Timer: ${minutes}:${seconds}`;
    });
  }

  setTimer(player) {
    this.currentTimer = setInterval(() => {
      player.timer++;
      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.currentTimer);
  }

  /************  GAME FLOW  ************/

  showPreStart(player) {
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "none";
    this.preGameScreen.style.display = "flex";
    const turnAnnouncementElement = document.getElementById("turn-annoucement");
    const betweenScreenPElement = document.getElementById("between-screen-p");
    document.getElementById(
      "current-round"
    ).textContent = `ROUND ${this.roundIndex}`;
    turnAnnouncementElement.textContent = `${player.name}'s turn!`;

    if (this.roundIndex === 1) {
      betweenScreenPElement.textContent = `Hi ${player.name}, great to meet you! Your task is to try to find Prickly Waldo on the picture. But look out, he will be hiding like a pro :)`;
    } else if (this.roundIndex > 1 && this.roundIndex < 3) {
      betweenScreenPElement.textContent = `Nice job so far ${player.name}! You keep on searching and Prickly Waldo keeps on hiding!`;
    } else {
      betweenScreenPElement.textContent = `This is the last round and last chance to keep up with your friend!`;
    }
  }

  startRound() {
    this.gameScreen.style.display = "block";
    this.preGameScreen.style.display = "none";
    // Initialize or continue the timer for the current player
    this.setTimer(this.currentPlayer);
    this.configureGameImage();
  }

  configureGameImage() {
    // choses random serach image
    const searchPicture = document.getElementsByClassName("search-picture")[0];
    const randomIndex = Math.floor(Math.random() * this.searchImage.length);
    searchPicture.src = this.searchImage[randomIndex];
    searchPicture.onload = () => this.setWaldoPosition(searchPicture);
  }

  setWaldoPosition(searchPicture) {
    // Positions Waldo on a random spot on the search image
    const randomWaldo = document.querySelector(".game-waldo");
    randomWaldo.src = "./images/waldo/waldo-transparent.png";
    randomWaldo.style.width = "35px";
    const maxX = searchPicture.clientWidth - randomWaldo.offsetWidth;
    const maxY = searchPicture.clientHeight - randomWaldo.offsetHeight;
    randomWaldo.style.left = `${Math.random() * maxX}px`;
    randomWaldo.style.top = `${Math.random() * maxY}px`;
    // sets alert whenever player clicks on waldo
    randomWaldo.onclick = () => this.playerFoundWaldo();
  }

  playerFoundWaldo() {
    this.stopTimer();
    alert(`${this.currentPlayer.name} found Prickly Waldo!`);
    // Switch turns
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    // Increases to next round every time its player1's turn
    if (this.currentPlayer === this.player1) {
      this.increaseRoundIndex();
    }
    // Setup for next player or ends game
    if (this.roundIndex === this.roundsTotal + 1) {
      this.showEndScreen();
    } else {
      this.showPreStart(this.currentPlayer);
    }
  }

  increaseRoundIndex() {
    this.roundIndex += 1;
  }

  showEndScreen() {
    this.gameScreen.style.display = "none";
    this.preGameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";

    // Adapts the win annoucement to the player that won
    if (this.player1.timer < this.player2.timer) {
      document.getElementById(
        "win-announcment"
      ).textContent = `${this.player1.name} won!`;
    } else {
      document.getElementById(
        "win-announcment"
      ).textContent = `${this.player2.name} won!`;
    }

    if (this.player1.timer < this.player2.timer) {
      document.getElementsByClassName(
        "speech-bubble-text"
      )[1].textContent = `WOW! It only took ${this.player1.name} ${this.player1.timer} seconds to find me on ${this.roundsTotal} different pictures!`;
    } else {
      document.getElementsByClassName(
        "speech-bubble-text"
      )[1].textContent = `WOW! It only took ${this.player2.name} ${this.player2.timer} seconds to find me on ${this.roundsTotal} different pictures!`;
    }
  }
}

window.onload = function () {
  let game = new Game();
};
