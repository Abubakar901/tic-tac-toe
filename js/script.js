addEventListener("DOMContentLoaded", function () {
  const board = this.document.querySelectorAll(".cell");
  const statusMessage = this.document.getElementById("status");
  const resetGame = this.document.getElementById("reset-game");

  // Declare game variables
  let currentPlayer = "X"; // Track current player
  let gameStatus = true; // Flag to check if the game is active

  // Define winning conditions (winning combinations)
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Switch turn between players (X <-> O)
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  };

  // Check if the current player has won the game
  const checkWinner = () => {
    for (let item of winningConditions) {
      const [a, b, c] = item;
      if (
        board[a].textContent === currentPlayer &&
        board[b].textContent === currentPlayer &&
        board[c].textContent === currentPlayer
      ) {
        gameStatus = false; // Stop further moves
        return true;
      }
    }
    return false;
  };

  // Check if all cells are filled, resulting in a tie
  const checkTie = () => {
    return Array.from(board).every((item) => item.textContent !== "");
  };

  // Handle player's move when a cell is clicked
  const handleCellClick = (event) => {
    if (!gameStatus) return; // Stop game if it's already won or drawn

    const element = event.target;
    if (element.textContent !== "" || checkWinner()) return; // Prevent overwriting

    element.textContent = currentPlayer; // Mark the move

    if (checkWinner()) {
      statusMessage.textContent = `Player ${currentPlayer} Wins!`;
    } else if (checkTie()) {
      statusMessage.textContent = `It's a Draw!`;
    } else {
      switchPlayerTurn(); // Continue the game
    }
  };

  // Reset the game when the reset button is clicked
  resetGame.addEventListener("click", () => {
    board.forEach((item) => {
      item.textContent = "";
    });
    currentPlayer = "X";
    gameStatus = true; // Reactivate the game
    statusMessage.textContent = `Player X's turn`; // Reset status message
  });

  // Add click event listeners to each cell
  board.forEach((item) => {
    item.addEventListener("click", handleCellClick);
  });
});
