document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restartButton");
    const playAgainButton = document.getElementById("playAgainButton");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Winning patterns
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    function updateStatus() {
        if (gameActive) {
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
            statusText.classList.remove("winner", "boomBlast");
            statusText.classList.add(`${currentPlayer}-turn`);
        }
    }

    function checkWinner() {
        for (let pattern of winPatterns) {
            let [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                statusText.textContent = `🎉 PLAYER ${gameBoard[a]} WINS! 🎉`;
                statusText.classList.add("winner", "boomBlast");

                // Firework effect
                createFireworks();

                playAgainButton.style.display = "block";
                return;
            }
        }

        if (!gameBoard.includes("")) {
            gameActive = false;
            statusText.textContent = "It's a Draw! 🤝";
            playAgainButton.style.display = "block";
        }
    }

    function handleCellClick(event) {
        let cell = event.target;
        let index = Array.from(cells).indexOf(cell);

        if (gameBoard[index] !== "" || !gameActive) return;

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus();
        }
    }

    function restartGame() {
        gameBoard.fill("");
        gameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });
        
        // Fix: Remove the "winner" & "boomBlast" class correctly
        statusText.classList.remove("winner", "boomBlast");
        statusText.textContent = "Player X's Turn";
        playAgainButton.style.display = "none";
        
        // Remove fireworks when restarting
        removeFireworks();
        updateStatus();
    }

    // ✅ Corrected Fireworks Effect
    function createFireworks() {
        for (let i = 0; i < 10; i++) {
            let firework = document.createElement("div");
            firework.classList.add("firework");

            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;

            firework.style.left = `${x}px`;
            firework.style.top = `${y}px`;

            let colors = ["#ff4d4d", "#ffcc00", "#33cc33", "#3399ff", "#ff66ff"];
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }

    // ✅ Remove Fireworks Function
    function removeFireworks() {
        document.querySelectorAll(".firework").forEach(firework => firework.remove());
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
    playAgainButton.addEventListener("click", restartGame);

    updateStatus();
});
