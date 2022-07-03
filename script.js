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
    let winner = '';

    const mark = (e) => {
        let desiredSquare = board[`${e.target.id}`];
        if (currentPiece === '') {
            currentPiece = playerOne.piece;
            if (desiredSquare === '') {
                board.splice(e.target.id, 1, currentPiece);
            }
        }
        else if (currentPiece === playerOne.piece && desiredSquare === '') {
            currentPiece = playerTwo.piece;
            board.splice(e.target.id, 1, currentPiece);
            winner = playerTwo.name;
            console.log(currentPiece)
        }
        else if (currentPiece === playerTwo.piece && desiredSquare === '') {
            currentPiece = playerOne.piece;
            board.splice(e.target.id, 1, currentPiece);
            winner = playerOne.name;
            console.log(currentPiece)
        };

        const { createBoard } = render;
        createBoard();
        checkWinner();
    };

    function checkWinner() {
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
            console.log(winner)
        }
        else if (board[3] === board[4] && board[4] === board[5] && board[3] != '') {
            console.log(winner)
        }
        else if (board[6] === board[7] && board[7] === board[8] && board[6] != '') {
            console.log(winner)
        }
        else if (board[0] === board[3] && board[3] === board[6] && board[0] != '') {
            console.log(winner)
        }
        else if (board[1] === board[4] && board[4] === board[7] && board[1] != '') {
            console.log(winner)
        }
        else if (board[2] === board[5] && board[5] === board[8] && board[2] != '') {
            console.log(winner)
        }
        else if (board[0] === board[4] && board[4] === board[8] && board[0] != '') {
            console.log(winner)
        }
        else if (board[2] === board[4] && board[4] === board[6] && board[2] != '') {
            console.log(winner)
        };
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

