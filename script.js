// Game board 
const gameBoard = (() => {
    const board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];
    return { board }
})();

// Player creation
const player = (name, piece) => {
    return { name, piece };
};

const playerOne = player('Player One', "X");
const playerTwo = player('Player Two', 'O');

// Playing the game
const playGame = (() => {
    const { board } = gameBoard;

    let currentPiece = '';

    const mark = (e) => {
        let desiredSquare = board[`${e.target.id}`];
        if (currentPiece === '') {
            currentPiece = playerOne.piece;
            if (desiredSquare === '') {
                board.splice(e.target.id, 1, currentPiece)
            }
        }
        else if (currentPiece === playerOne.piece) {
            currentPiece = playerTwo.piece;
            if (desiredSquare === '') {
                board.splice(e.target.id, 1, currentPiece)
            }
        }
        else if (currentPiece === playerTwo.piece) {
            currentPiece = playerOne.piece;
            if (desiredSquare === '') {
                board.splice(e.target.id, 1, currentPiece)
            }
        }

        const { createBoard } = render;
        createBoard();
    }

    let selectedSquare = document.querySelectorAll('.gridBox');
    selectedSquare.forEach((div) => {
        div.addEventListener('click', mark)
    })
})();


// Rendering and resetting board
const render = (() => {
    const { board } = gameBoard;

    function createBoard() {
        for (let i = 0; i < board.length; i++) {
            let square = document.getElementById(i);
            square.innerText = board[i];
        };
    };

    let resetButton = document.querySelector('#resetButton');
    resetButton.addEventListener('click', () => {
        for (let j = 0; j < board.length; j++) {
            board[j] = '';
            createBoard();
        };
    });
    return { createBoard };
})();

