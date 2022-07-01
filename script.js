// Game board 
const gameBoard = (() => {
    const board = [
        '','','',
        '','','',
        '','','',
    ];
    return {board}
})();

// Player creation
const player = ((name, piece) => {
    return {name, piece};
})

const playerOne = player('Player One', "X");
const playerTwo = player('Player Two', 'O');