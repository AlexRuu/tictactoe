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
    };

    // Look for a winner
    function checkWinner() {
        // Horizontal Win
        if (board[0] === board[1] && board[1] === board[2] && board[0] !== '') {
            console.log(winner)
            removeMove();
            currentPiece = '';
            displayWinner();
            return;
        }
        else if (board[3] === board[4] && board[4] === board[5] && board[3] != '') {
            console.log(winner)
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[6] === board[7] && board[7] === board[8] && board[6] != '') {
            console.log(winner)
            removeMove();
            currentPiece = '';
            return;
        }
        // Vertical Win
        else if (board[0] === board[3] && board[3] === board[6] && board[0] != '') {
            console.log(winner)
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[1] === board[4] && board[4] === board[7] && board[1] != '') {
            console.log(winner)
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[2] === board[5] && board[5] === board[8] && board[2] != '') {
            console.log(winner)
            removeMove();
            currentPiece = '';
            return;
        }
        // Diagonal Win
        else if (board[0] === board[4] && board[4] === board[8] && board[0] != '') {
            console.log(winner)
            removeMove();
            currentPiece = '';
            return;
        }
        else if (board[2] === board[4] && board[4] === board[6] && board[2] != '') {
            console.log(winner)
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

    function displayWinner() {
        const winnerModal = document.querySelector('.winner');
        let newGameButton = document.createElement('button');
        let winnerText = document.createElement('div');

        winnerText.innerText = `${winner} wins!`;
        winnerText.classList.add('winnerText');

        newGameButton.classList.add('newGame');
        newGameButton.innerText = "New Game";
        winnerModal.appendChild(winnerText);
        winnerModal.appendChild(newGameButton);
    }

})();


// Rendering and resetting board
const render = (() => {
    const { board } = gameBoard;
    const { addMove } = playGame;

    function createBoard() {
        for (let i = 0; i < board.length; i++) {
            let square = document.getElementById(i);
            square.innerText = board[i];
        };

        let resetButton = document.querySelector('#resetButton');
        resetButton.addEventListener('click', () => {
            for (let j = 0; j < board.length; j++) {
                board[j] = '';
            };
            addMove();
            createBoard();
        });
    };
    return { createBoard };
})();