// Initializing the game board
let gameBoard = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';

function handleCellClick(cellIndex) {
  
    if (gameBoard[cellIndex] === '' && checkGameActive()) {
        
        gameBoard[cellIndex] = currentPlayer;
        displayMarker(cellIndex);

        if (checkWinner(currentPlayer)) {
            displayMessage(`${currentPlayer} wins!`);
        } else if (isBoardFull()) {
            displayMessage("It's a draw!");
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check if the game is still active
function checkGameActive() {
    return !checkWinner('X') && !checkWinner('O') && !isBoardFull();
}


function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return true;
        }
    }
    return false;
}


function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

// Display the player's marker on the board
function displayMarker(cellIndex) {
    const cell = document.getElementById(cellIndex);
    cell.innerText = gameBoard[cellIndex];
}


function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
}

// Event listeners for cell clicks
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});


function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    displayMessage('');
    cells.forEach(cell => cell.innerText = '');
  
    // Remove the 'winner' class from all cells
    cells.forEach(cell => cell.classList.remove('winner'));

}

// Event listener for the reset button
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetGame);
