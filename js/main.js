class Game {
    constructor() {
        this.board = new Array(9).fill(null);
        this.turn = "X";
        document.querySelector(".player-x").style.color = "#283542";
        document.querySelector(".player-o").style.color = "#D1D5DB";
    }

    nextTurn() {
        if (this.turn == "X") this.turn = 'O';
        else this.turn = "X";
        if (this.turn == "X") {
            document.querySelector(".player-x").style.color = "#283542";
            document.querySelector(".player-o").style.color = "#D1D5DB";
        } else {
            document.querySelector(".player-o").style.color = "#283542";
            document.querySelector(".player-x").style.color = "#D1D5DB";
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
                setTimeout(() => {
                    this.popUpModal(this.board[a]);
                }, 1500);
            }
            if (this.board[a] == this.board[b] && this.board[b] == this.board[c] && this.board[c] == this.board[a] && this.board[a] == "O") {
                makeWinnerGreen(a, b, c);
                setTimeout(() => {
                    this.popUpModal(this.board[a]);
                }, 1500);
            }
        }
    }

    isFilled() {
        for (var i = 0; i < this.board.length; i++) {
            if (!this.board[i]) {
                return;
            }
        }
        document.querySelector(".winnerModal").style.display = "block";
        document.querySelector(".left").style.display = "none";
        document.querySelector(".right").style.display = "none";
        document.querySelector(".winner").innerHTML = `😞 No one has won this game 😞`;
    }

    popUpModal(a) {
        document.querySelector(".winnerModal").style.display = "block";
        document.querySelector(".left").style.display = "none";
        document.querySelector(".right").style.display = "none";
        document.querySelector(".winner").innerHTML = `🎊 Player-${a} won this game 🎊`;
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
        document.querySelector(".player-o").style.color = "#D1D5DB";

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
