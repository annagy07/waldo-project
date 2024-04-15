# Prickly Waldo

## Description

_Prickly Waldo_ is a fun, interactive game for two players, inspired by the classic game "Where's Waldo?". In this version, players are tasked with finding not Waldo, but a well-hidden hedgehog named Prickly Waldo. Each player takes turns to locate Prickly Waldo as quickly as possible within a variety of images. The game spans 4 rounds, and each player's time is recorded — the player who spots Prickly Waldo fastest wins!

## Game Logic

- The game consists of **4 rounds**.
- In each round, both players (one after another) have the chance to find Prickly Waldo in an image.
- Each player has their own timer, which stops when they click on Prickly Waldo.
- The timer pauses for the inactive player and resumes from where it left off when it's their turn again.
- After 4 rounds, the player with the lowest overall time is declared the winner.

## JavaScript Overview

The game logic is implemented in JavaScript and consists of a `Game` class with the following structure:

- **Constructor**: Sets up initial game state, including the screens (start, pre-game, game, and end), players, search images, and rounds.
- **UI Setup**: Initializes event listeners for player name changes, game start, game play, and restart actions.
- **Timer Functions**: Contains methods to start and stop the timers, and update the timer display on the screen.
- **Game Flow**:
  - Methods to handle the pre-start screen, start a new round, and configure the game image.
  - Methods to position Prickly Waldo randomly, handle the event of finding Waldo, switch turns between players, and handle the transition to the next round or end the game.
- **End Game**: Display the results and the winning player.

The script is set to initialize the `Game` instance once the window loads.

## How to Play

1. Enter player names in the input fields provided.
2. Click on the 'Start' button to begin the first player's turn.
3. When it's your turn, click 'Go!' and find Prickly Waldo as fast as you can.
4. Once found, click on Prickly Waldo to stop the timer.
5. The game will proceed to the next round until all 5 rounds are completed.
6. At the end, the player with the lowest total time wins!

## Installation

No installation is required. Simply load the HTML file in a web browser to start the game.

## Technologies Used

- HTML
- CSS
- JavaScript (ES6)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
