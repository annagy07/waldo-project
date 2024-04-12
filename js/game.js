class Game {
  // constructor
  constructor() {
    this.player1 = new Player(document.getElementById("player1name").value);
    this.player2 = new Player(document.getElementById("player2name").value);
    this.searchImage = [
      "./images/search-img/ski-waldo.jpg",
      "./images/search-img/office-waldo.jpg",
    ];

    // views
    this.startScreen = document.getElementById("start-screen");
    this.preGameScreen = document.getElementById("pre-game-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("end-screen");

    document.getElementById("player1name").addEventListener("change", (e) => {
      console.log(e.target.value);
      this.player1 = new Player(e.target.value);
    });
    document.getElementById("player2name").addEventListener("change", (e) => {
      console.log(e.target.value);
      this.player2 = new Player(e.target.value);
    });
  }

  /************  TIMER  ************/

  updateTimerDisplay() {
    let minutes1 = Math.floor(this.player1.timer / 60)
      .toString()
      .padStart(2, "0");
    let seconds1 = (this.player1.timer % 60).toString().padStart(2, "0");
    document.getElementById(
      "player1-timer"
    ).textContent = `${this.player1.name}'s Timer: ${minutes1}:${seconds1}`;

    let minutes2 = Math.floor(this.player2.timer / 60)
      .toString()
      .padStart(2, "0");
    let seconds2 = (this.player2.timer % 60).toString().padStart(2, "0");
    document.getElementById(
      "player2-timer"
    ).textContent = `${this.player2.name}'s Timer: ${minutes2}:${seconds2}`;
  }

  setTimer(player) {
    this.gameIntervalId = setInterval(() => {
      // Increment the timer for the active player
      if (player === this.player1) {
        this.player1.timer += 1;
      } else if (player === this.player2) {
        this.player2.timer += 1;
      }
      // Update the display
      this.updateTimerDisplay();
    }, 1000);
    document
      .getElementsByClassName("game-waldo")[0]
      .addEventListener("click", () => {
        this.stopTimer(this.gameIntervalId, player);
      });
  }

  /************  ROUND LOOP  ************/

  playerTurn() {
    if (this.player1.turn === true) {
      this.player1.turn = false;
      this.showPreStart(this.player1);
    } else {
      this.showPreStart(this.player2);
      this.player1.turn = true;
    }
  }

  showPreStart(player) {
    this.startScreen.style.display = "none";
    this.preGameScreen.style.display = "block";
    document.getElementById(
      "turn-annoucement"
    ).textContent = `${player.name}'s turn!`;
    document.getElementById(
      "between-screen-p"
    ).textContent = `Okay ${player.name}, now it's time to focus. Try to find me and click on me as fast as you can`;
    const startPlayingButton = document.getElementById("start-playing-button");
    startPlayingButton.addEventListener("click", () => {
      this.showNewRound(player);
    });
  }

  showNewRound(player) {
    this.preGameScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    //generates random searchimage
    // const searchPicture = document.getElementsByClassName("search-picture")[0];
    // console.log(searchPicture);
    // let randomIndex = Math.floor(Math.random() * this.searchImage.length);
    // searchPicture.src = this.searchImage[randomIndex];

    // //generates random waldo position

    // const randomWaldo = document.querySelector(".game-waldo");
    // randomWaldo.src = "./images/waldo/waldo-transparent.png";
    // randomWaldo.style.width = "35px";

    // const imageWidth = searchPicture.clientWidth;
    // const imageHeight = searchPicture.clientHeight;

    // const maxX = imageWidth - randomWaldo.offsetWidth;
    // const maxY = imageHeight - randomWaldo.offsetHeight;

    // const randomX = Math.random() * maxX;
    // const randomY = Math.random() * maxY;

    // randomWaldo.style.left = `${randomX}px`;
    // randomWaldo.style.top = `${randomY}px`;

    const searchPicture = document.getElementsByClassName("search-picture")[0];
    // Make sure you define this.searchImage array correctly somewhere in your code.
    const randomIndex = Math.floor(Math.random() * this.searchImage.length);
    searchPicture.src = this.searchImage[randomIndex];
    console.log(searchPicture.src);

    // Ensure Waldo is positioned after the image has loaded
    searchPicture.onload = () => {
      const randomWaldo = document.querySelector(".game-waldo");
      randomWaldo.src = "./images/waldo/waldo-transparent.png";
      randomWaldo.style.width = "35px";

      const imageWidth = searchPicture.clientWidth;
      const imageHeight = searchPicture.clientHeight;

      const maxX = imageWidth - randomWaldo.offsetWidth;
      const maxY = imageHeight - randomWaldo.offsetHeight;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      randomWaldo.style.left = `${randomX}px`;
      randomWaldo.style.top = `${randomY}px`;
    };

    this.setTimer(player);
  }

  stopTimer(interval, player) {
    player.timeSum += player.timer;
    clearInterval(interval);
    console.log(player.timeSum);
  }
}
