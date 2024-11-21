document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusMessage = document.getElementById("status");
    const resetButton = document.getElementById("reset");
  
    let currentPlayer = "X";
    let gameState = Array(9).fill("");
    let gameActive = true;
  
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

    function handleCellClick(event) {
      const clickedCell = event.target;
      const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"), 10);
  
      if (gameState[cellIndex] !== "" || !gameActive) {
        return;
      }
  
      // Update game state and UI
      gameState[cellIndex] = currentPlayer;
      updateCellUI(clickedCell);
      evaluateGameState();
    }

    function updateCellUI(cell) {
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());
      cell.classList.add("pop");
      cell.setAttribute("aria-label", `Player ${currentPlayer}`);
      setTimeout(() => cell.classList.remove("pop"), 300);
    }

    function evaluateGameState() {
      if (isWinningMove()) {
        statusMessage.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
      } else if (isDraw()) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
      } else {
        switchPlayer();
      }
    }
  
    function isWinningMove() {
      return winningConditions.some((condition) =>
        condition.every((index) => gameState[index] === currentPlayer)
      );
    }
  
    function isDraw() {
      return gameState.every((cell) => cell !== "");
    }

    function switchPlayer() {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }

    function resetGame() {
      currentPlayer = "X";
      gameState.fill("");
      gameActive = true;
      statusMessage.textContent = "Player X's turn";
  
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.className = "cell"; // Reset classes
        cell.setAttribute("aria-label", "Empty");
      });
    }
  
    function initializeGame() {
      cells.forEach((cell, index) => {
        cell.setAttribute("data-cell-index", index);
        cell.addEventListener("click", handleCellClick);
      });
  
      resetButton.addEventListener("click", resetGame);
    }
  
    initializeGame();
  });
  