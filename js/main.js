class Game {
    constructor() {
        this.board = new Array(9).fill(null);
        this.turn = "X";
        document.querySelector(".player-x").style.color = "#283542";
        document.querySelector(".player-o").style.color = "#9a9a9a";
    }

    nextTurn() {
        if (this.turn == "X") this.turn = 'O';
        else this.turn = "X";
        if (this.turn == "X") {
            document.querySelector(".player-x").style.color = "#283542";
            document.querySelector(".player-o").style.color = "#9a9a9a";
        } else {
            document.querySelector(".player-o").style.color = "#283542";
            document.querySelector(".player-x").style.color = "#9a9a9a";
        }
    }

    makeMove(i) {
        if (this.board[i]) {
            this.nextTurn();
            return;
        }
        this.board[i] = this.turn; //X or O
        this.findWinner();
        this.isFilled();
    }

    findWinner() {
        const winninngCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        for (const combination of winninngCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] == this.board[b] && this.board[b] == this.board[c] && this.board[c] == this.board[a] && this.board[a] == "X") {
                makeWinnerGreen(a, b, c);
                this.popUpModal(this.board[a]);
            }
            if (this.board[a] == this.board[b] && this.board[b] == this.board[c] && this.board[c] == this.board[a] && this.board[a] == "O") {
                makeWinnerGreen(a, b, c);
                this.popUpModal(this.board[a]);
            }
        }
    }

    isFilled() {
        for (var i = 0; i < this.board.length; i++) {
            if (!this.board[i]) {
                return;
            }
        }
    }

    popUpModal(a) {
        document.querySelector(".winnerModal").style.display = "block";
        document.querySelector(".left").style.display = "none";
        document.querySelector(".right").style.display = "none";
        document.querySelector(".winner").innerHTML = `🎊 Player ${a} won this game 🎊`;
    }

    removePopUp() {
        document.querySelector(".winnerModal").style.display = "none";
        document.querySelector(".left").style.display = "block";
        document.querySelector(".right").style.display = "block";
    }

    restart() {
        this.board = new Array(9).fill(null);
        this.turn = "X";
        document.querySelector(".player-x").style.color = "#283542";
        document.querySelector(".player-o").style.color = "#9a9a9a";

    }
}

class GameView {

    updateBoard(game) {
        console.log(game.board);
        for (let i = 0; i < game.board.length; i++) {
            const tile = document.querySelector(`.board-tile[data-index='${i}']`);
            tile.textContent = game.board[i];
        }
    }
}

let game = new Game();
let gameView = new GameView();

let tiles = document.querySelectorAll(".board-tile");
tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        onTileClick(tile.dataset.index);
    })
})

function onTileClick(i) {
    //make move
    game.makeMove(i);
    //update board
    gameView.updateBoard(game);
    //change turn
    game.nextTurn();
}

function makeWinnerGreen(a, b, c) {
    document.querySelector(`.board-tile[data-index='${a}']`).style.color = "#059669";
    document.querySelector(`.board-tile[data-index='${b}']`).style.color = "#059669";
    document.querySelector(`.board-tile[data-index='${c}']`).style.color = "#059669";
}

document.querySelector(".restart").addEventListener("click", () => {
    game.restart();
    gameView.updateBoard(game);
    game.removePopUp();
})

document.querySelector(".modal_restart").addEventListener("click", () => {
    game.restart();
    gameView.updateBoard(game);
    game.removePopUp();
})