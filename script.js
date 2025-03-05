document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const playerTurnText = document.getElementById("playerTurn");
    const resetButton = document.getElementById("resetButton");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]  
    ];

    function handleCellClick(event) {
        const cellIndex = event.target.dataset.index;

        if (board[cellIndex] !== "" || !gameActive) {
            return;
        }

        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerTurnText.textContent = currentPlayer;
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                alert(`Player ${board[a]} win!`);
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            alert("Berabere!");
        }
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        playerTurnText.textContent = currentPlayer;
        cells.forEach(cell => cell.textContent = "");
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
