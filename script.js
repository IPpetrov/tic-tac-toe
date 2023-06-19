

// Gameboard module
const gameBoard = (() => {
    let board = Array(9).fill(null);
    const gameContainer = document.getElementById("game-container");
    
    // Create board

    for (let i = 0; i < board.length ; i++) {
        const createDiv = document.createElement("div");
        gameContainer.appendChild(createDiv);
        createDiv.classList.add("square");
    }
    
    return {board}
})();

// Game module

const game = (() => {
    const cell = document.querySelectorAll('.square');
    const showTurn = document.getElementById("show-turn");
    const resetButton = document.getElementById("reset-button");
    const startButton = document.getElementById("start-button");
    const player1 = document.getElementById("player1")
    const player2 = document.getElementById("player2")
    let playerOneMoves = [];
    let playerTwoMoves = [];
    let gameOver = false;
    let turn = "x";

    

    // Check win 

    function checkWinner() {
        const winning = [
            [0, 1, 2], 
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ]      

        for (let i = 0; i < winning.length ; i++) {
            a = winning[i][0]
            b = winning[i][1]
            c = winning[i][2]
            if (playerOneMoves.includes(a) && playerOneMoves.includes(b) && playerOneMoves.includes(c)) {
                showTurn.innerHTML = "CONGRATULATIONS " + player1.value + ", you WIN!"
                showTurn.classList.add("win-x")
                cell[a].classList.add("highlight")
                cell[b].classList.add("highlight")
                cell[c].classList.add("highlight")
                gameOver = true;
                return true;
            } 
            else if (playerTwoMoves.includes(a) && playerTwoMoves.includes(b) && playerTwoMoves.includes(c)) {
                showTurn.innerHTML = "CONGRATULATIONS " + player2.value + ", you WIN!"
                showTurn.classList.add("win-o")
                cell[a].classList.add("highlight")
                cell[b].classList.add("highlight")
                cell[c].classList.add("highlight")
                gameOver = true;
                return true;
            }
        }
        return false
    }

    // Check draw

    function checkDraw() {
        if (gameBoard.board.includes(null)) {
            return false
        }
        else {
            return true
        }
    }

    // Reset game button

    function resetGame() {
        if ((player1.value == "" || player2.value == "") || (!gameBoard.board.includes("x") && !gameBoard.board.includes("o"))) {
            return
        }
        else {
            showTurn.innerHTML = "New game! It's " + player1.value + "'s turn!"
            gameBoard.board.fill(null);
            playerOneMoves = [];
            playerTwoMoves = [];
            cell.forEach((element) => {
                element.innerHTML = "";
                element.classList.remove("disabled");
                element.classList.add("square-highlight");
                element.classList.remove("o")
                element.classList.remove("x")
                element.classList.remove("highlight")
                showTurn.classList.remove("o","x", "win-x", "win-o")
                turn = "x";
                gameOver = false;
            }) 
        }
        
    }

    resetButton.addEventListener("click", resetGame)

    // Start game, place markers, check win, change turn

    startButton.addEventListener("click", () => {
        if (player1.value == "" || player2.value == "") {
            player1.placeholder = "Add name to continue.."
            player2.placeholder = "Add name to continue.."
            player1.classList.add("red-border")
            player2.classList.add("red-border")
            return
        }
        else {
            cell.forEach((element) => {
                element.classList.add("square-highlight");
            })
    
            showTurn.innerHTML = "Game started! It's " + player1.value + "'s turn!"
            player1.classList.remove("red-border")
            player2.classList.remove("red-border")
    
            cell.forEach((element, i) => {
                element.addEventListener("click", () => {
                    element.classList.add("disabled");
                    element.classList.remove("square-highlight");
                    if (element.innerHTML == "" && !gameOver) {
                        if (turn == "x") {
                            element.innerHTML = "x";
                            element.classList.add("x");
                            gameBoard.board[i] = "x";
                            playerOneMoves.push(i);
                            if (checkDraw() && !checkWinner()) {
                                showTurn.innerHTML = "Nobody wins this time.."
                                gameOver = true;
                                StopGame()
                            }
                            else if (!checkWinner()) {
                                turn = "o";
                                showTurn.innerHTML = player2.value + "'s turn!";
                            }
                            else {
                                StopGame()
                            }
                        }
                        else {
                            element.innerHTML = "o";
                            element.classList.add("o");
                            gameBoard.board[i] = "o";
                            playerTwoMoves.push(i);
                            if (checkDraw() && !checkWinner()) {
                                showTurn.innerHTML = "Game is DRAW!"
                                gameOver = true;
                                StopGame()
                            }
                            else if (!checkWinner()) {
                                turn = "x";
                                showTurn.innerHTML = player1.value + "'s turn!";
                            }
                            else {
                                StopGame()
                            }
                        }
                    } 
                })
            });
        }
    })
    

    
    function StopGame() {
        cell.forEach((element) => {
            if (element.innerHTML == "") {
                element.classList.add("disabled");
                element.classList.remove("square-highlight");
            }
        })
    }

    return {turn, checkWinner, gameOver, playerOneMoves, playerTwoMoves, checkDraw, player1, player2}
})();
