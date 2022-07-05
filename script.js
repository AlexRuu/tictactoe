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
    let newBtn = document.querySelector('#resetButton')

    let currentPiece = '';
    let winner = '';

    // Game marker
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
        }
        else if (currentPiece === playerTwo.piece && desiredSquare === '') {
            currentPiece = playerOne.piece;
            board.splice(e.target.id, 1, currentPiece);
            winner = playerOne.name;
        };

        const { createBoard } = render;
        createBoard();
        checkWinner();
        newBtn.addEventListener('click', () => {
            currentPiece = '';
        });
    };

    // Look for a winner
    function checkWinner() {
        // Horizontal Win
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[3] === board[4] && board[4] === board[5] && board[3] != '') {
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[6] === board[7] && board[7] === board[8] && board[6] != '') {
            removeMove();
            currentPiece = '';
            return;
        }
        // Vertical Win
        else if (board[0] === board[3] && board[3] === board[6] && board[0] != '') {
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[1] === board[4] && board[4] === board[7] && board[1] != '') {
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[2] === board[5] && board[5] === board[8] && board[2] != '') {
            removeMove();
            currentPiece = '';
            return;
        }
        // Diagonal Win
        else if (board[0] === board[4] && board[4] === board[8] && board[0] != '') {
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[2] === board[4] && board[4] === board[6] && board[2] != '') {
            removeMove();
            currentPiece = '';
            return;
        }
        // Draw
        else {
            let counter = 0;
            for (let i = 0; i < board.length; i++) {
                if (board[i] != '') {
                    counter++;
                    if (counter === 9) {
                        console.log('draw')
                        currentPiece = '';
                        return;
                    };
                };
            };
        };
    };

    // Place marker
    let selectedSquare = document.querySelectorAll('.gridBox');
    function addMove() {
        selectedSquare.forEach((div) => {
            div.addEventListener('click', mark)
        })
    }
    function removeMove() {
        selectedSquare.forEach((div) => {
            div.removeEventListener('click', mark)
        })
    }
    addMove();
    return {addMove}

    // Winner message 
    function winnerMessage() {
        let winner = document.querySelector('.winner');
        
    }
})();


// Rendering and resetting board
const render = (() => {
    const { board } = gameBoard;
    const { addMove } = playGame;
    let { currentPiece } = playGame

    function createBoard() {
        for (let i = 0; i < board.length; i++) {
            let square = document.getElementById(i);
            square.innerText = board[i];
        };

        let resetButton = document.querySelector('#resetButton');
        resetButton.addEventListener('click', () => {
            for (let j = 0; j < board.length; j++) {
                board[j] = '';
                currentPiece = '';
            };
            addMove();
            createBoard();
        });
    };
    return { createBoard };
})();