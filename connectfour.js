var playerTeal = "T";
var playerPink = "P";
var curP = playerTeal;

var gameOver = false;
var board;
var curCol;

var rows = 6;
var columns = 7;

window.onload = function() {
    initBoard();
}

function initBoard() {
    board = [];
    curCol = Array(columns).fill(rows-1);
    let boardCSS = document.getElementById("board");
    boardCSS.style = "width:"+columns*90+"px;height:"+rows*90+"px;";
    // document.getElementById("header").innerText = "Connect Four";
    document.getElementById("player").innerText = "Teal's turn";

    for(let r = 0; r < rows; r++) {
        let row = [];
        for(let c = 0; c < columns; c++) {
            row.push(' ');

            /* Create tile pieces
            * <div id="r-c" class="tile"></div>
            */
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if(gameOver) return;
    
    let coords = this.id.split("-"); //"1-2" -> ["row", "column"]
    let c = parseInt(coords[1]);
    let r = curCol[c];
    if(r < 0) return;
    board[r][c] = curP;

    let tile = document.getElementById(r.toString() + "-" + coords[1])
    tile.classList.add((curP == playerTeal) ? "teal-piece" : "pink-piece");
    curP = (curP == playerTeal) ? curP = playerPink : curP = playerTeal;
    document.getElementById("player").innerText = (curP == playerTeal) ? "Teal's turn" : "Pink's turn";

    curCol[c] = --r;
    checkWinner();
}

function checkWinner() {
    //Sliding window check technique. Will change to check all around placed tile.
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns - 3; c++) {
            if(board[r][c] != ' ') {
                if(board[r][c] == board[r][c+1]
                && board[r][c+1] == board[r][c+2]
                && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for(let c = 0; c < columns; c++) {
        for(let r = 0; r < rows-3; r++) {
            if(board[r][c] != ' ') {
                if(board[r][c] == board[r+1][c]
                && board[r+1][c] == board[r+2][c]
                && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for(let r = 0; r < rows-3; r++) {
        for(let c = 0; c < columns-3; c++) {
            if(board[r][c] != ' ') {
                if(board[r][c] == board[r+1][c+1]
                && board[r+1][c+1] == board[r+2][c+2]
                && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    for(let r = 3; r < rows; r++) {
        for(let c = 0; c < columns - 3; c++) {
            if(board[r][c] != ' ') {
                if(board[r][c] == board[r-1][c+1]
                && board[r-1][c+1] == board[r-2][c+2]
                && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //Check if a tie:
    //If every column on the board is set to -1, 
    //all the columns are full and winners were checked.
    if(curCol.every(v => v === -1)) {
        setWinner(-1,-1);
        return;
    }
}

function setWinner(r, c) {
    document.getElementById("player").innerText = "";
    let winner = document.getElementById("winner");
    if(r == -1 && c == -1) winner.innerText = "It's a tie!";
    else if(board[r][c] == "T") winner.innerText = "Teal Wins";
    else winner.innerText = "Pink Wins";
    gameOver = true;
}

function resetBoard() {
    let board = document.getElementById("board");
    while(board.firstChild) board.removeChild(board.lastChild);
    initBoard();
    return;
}