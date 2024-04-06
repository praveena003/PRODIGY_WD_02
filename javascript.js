function checkWinner(board) {
    
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
           
            document.querySelector(`.box[data-index="${a}"]`).classList.add('win');
            document.querySelector(`.box[data-index="${b}"]`).classList.add('win');
            document.querySelector(`.box[data-index="${c}"]`).classList.add('win');
            return board[a]; 
        }
    }

  
    if (board.every(cell => cell !== "")) {
        return "draw";
    }

    return null;
}


function init() {
    const boxes = document.querySelectorAll('.box');
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Represent the game board
    let gameOver = false;

    // Add click event listeners to each box
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            if (!gameOver && gameBoard[index] === "") {
                box.innerHTML = currentPlayer;
                gameBoard[index] = currentPlayer;

                const winner = checkWinner(gameBoard);
                if (winner) {
                    gameOver = true;
                    if (winner === "draw") {
                        document.getElementById('status').textContent = "Game Draw!";
                    } else {
                        document.getElementById('status').textContent = `${winner} Won!`;
                    }
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    document.getElementById('status').textContent = `${currentPlayer}'s Turn`;
                }
            }
        });
    });

    
    document.getElementById('restart').addEventListener('click', () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;
        boxes.forEach(box => {
            box.innerHTML = "";
            box.classList.remove('win'); 
        });
        document.getElementById('status').textContent = "X's Turn";
    });
}


document.addEventListener('DOMContentLoaded', init);
