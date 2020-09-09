let players = ['x', 'o'];
let activePlayer = 0;
let board = [];

function startGame() {
  board = [];
  let boardSize = 3;
  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      board[i].push('');
    }
  }
  activePlayer = players[0];
  renderBoard(board);
}

function click(col, row) {
  board[col][row] = activePlayer;
  renderBoard(board);
  checkWinner(board);
  if (activePlayer === players[0]) {
     activePlayer = players[1];
  } else {
    activePlayer = players[0];
  }

  if (activePlayer === players[1]) {
    let freeSquares = Array.from(document.getElementsByClassName('free'));
    if (freeSquares.length > 0) {
      let bot = freeSquares[Math.floor(Math.random() * Math.floor(freeSquares.length))];
      click(bot.dataset.row, bot.dataset.col);
    }
  }
}

function checkWinner(board) {
  let horizontal = 0;
  let vertical = 0;
  let diagonalToRight = 0;
  let diagonalToLeft = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
        if (board[i].every(j => j === activePlayer)) {
          horizontal++;
        }
        if (board.every(i => i[j] === activePlayer)) {
          vertical++;
        }
        if (i === j && board[i][j] === activePlayer) {
          diagonalToRight++;
        }
        for (let n = 0; n < board.length; n++) {
          if (i === n && j === board.length - 1 - n && board[i][j] === activePlayer) {
            diagonalToLeft++;
        }
      }
    }
  }
  if (diagonalToRight === board.length || diagonalToLeft === board.length || horizontal !== 0 || vertical !== 0) {
    let winner = players.findIndex(i => i === activePlayer);
    showWinner(winner);
  } else if (document.getElementsByClassName('free').length === 0) {
    showDraw();
  }
}

function showDraw() {
  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🤷‍♀️ Ничья 🤷‍♀️`;
  modalEl.classList.remove('hidden');
}