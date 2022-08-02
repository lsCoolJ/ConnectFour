# ConnectFour
Quick mock-up of a Connect Four game for a coding assessment.

- Added the three core files for playing the game, connectfour.html and connectfour.css to display the board and connectfour.js to control the game.
- In this initial iteration, players will take turns starting with Teal. Maybe in future versions, the players can select their colors and the color of the board.
- Currently, I am combing through the entire board every time a piece is placed to determine if there's a winner or not. In the future, I would like to only check the immediate areas surrounding the place the chip was dropped. This doesn't matter so much for a regular sized game board, but would be necessary if the users wanted to play larger games.
- The game can be reset at any time. This will clear the board and it will be Teal's turn first. In the future, I'd like to also add an undo button. This way, if the mouse button is accidentally pressed before the player can make their turn, a quick undo would be better than resetting the entire board.
- Could also add features such as a scoreboard, save states, cpu vs, and as previously mentioned, board style and player color selections.
