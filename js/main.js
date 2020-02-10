/*----- constants -----*/

const revealState = {
    tiles: {}
}
const timerEl = document.querySelector('h2');
const boardEl = document.getElementById('board');




/*----- app's state (variables) -----*/

let boardLayout;
let columnCount = 10;
let rowCount = 8;
let bombCount = 10;
let revealedTiles = 0;
let seconds = 0;
let minutes = 0;
let timeNow;
/*----- cached element references -----*/
boardLayout = findBombAdjacent(getBombs(columnCount, rowCount, bombCount));
/*----- event listeners -----*/
/*----- functions -----*/
function checkWinCon() {
    return revealedTiles === columnCount * rowCount - bombCount;
}

function setRevealState(board) {
    for (let i = 0; i < board.length; i++) {
            revealState.tiles[i] = 'h';
        }
    }
}

function findBombAdjacent(board) {
    for (let i = 0; i < board.length; i++) {
        let x = i % columnCount;
        let y = Math.floor(i / columnCount);
        if (board[i] === 'b') {
            if (x > 0 && board[i - 1] !== 'b') board[i - 1] += 1;
            if (y > 0 && board[i - columnCount] !== 'b') board[i - columnCount] += 1;
            if (x > 0 && y > 0 && board[i - columnCount - 1] !== 'b') board[i - columnCount - 1] += 1;
            if (x > 0 && y < (rowCount - 1) && y < (rowCount - 1) && board[i + columnCount - 1] !== 'b') board[i + columnCount - 1] += 1;
            if (x < (columnCount - 1) && board[i + 1] !== 'b') board[i + 1] += 1;
            if (y < (rowCount - 1) && board[i + columnCount] !== 'b') board[i + columnCount] += 1;
            if (x < (columnCount - 1) && y < (rowCount - 1) && board[i + columnCount + 1] !== 'b') board[i + columnCount + 1] += 1;
            if (x < (columnCount - 1) && y > 0 && y < (rowCount - 1) && board[i - columnCount + 1] !== 'b') board[i - columnCount + 1] += 1;
        }
    }
    return board;
}
function checkBlank(index) {
    if(boardLayout[index] !== 'b' && revealState[index] === 'h') {
        const x = index % columnCount;        
        const y = Math.floor(index / columnCount);
        revealedTiles++;
        reavealState[index] = 'r';
        if (boardLayout[index] === 0) {
            if (x > 0 && revealState[index - 1] === 'h') checkBlank(index - 1);
            if (y > 0 && revealState[index - columnCount] === 'h') checkBlank(index - columnCount);
            if (x > 0 && y > 0 && revealState[index - columnCount - 1] === 'h') checkBlank(index - columnCount - 1);
            if (x > 0 && y < (rowCount - 1) && y < (rowCount - 1) && revealState[index + columnCount - 1] === 'h') checkBlank(index + columnCount - 1);
            if (x < (columnCount - 1) && revealState[index + 1] === 'h') checkBlank(index + 1);
            if (y < (rowCount - 1) && revealState[index + columnCount] === 'h') checkBlank(index + columnCount);
            if (x < (columnCount - 1) && y < (rowCount - 1) && revealState[index + columnCount + 1] === 'h') checkBlank(index + columnCount + 1);
            if (x < (columnCount - 1) && y > 0 && y < (rowCount - 1) && revealState[index - columnCount + 1] === 'h') checkBlank(index - columnCount + 1);
        }
    }
}

function getBombs(columns, rows, bombs) {
    let tempArr = new Array(columns * rows).fill(0);
    let curIdx;
    while (bombs > 0) {
        curIdx = getRandomIdx(tempArr.length - 1);
        
        if (tempArr[curIdx] === 0) {
            tempArr[curIdx] = 'b';
            bombs -= 1;
        }
    }
    return tempArr;
}

function getRandomIdx(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// function addTime() {
//     seconds++;
//     if (seconds >= 60) {
//         seconds = 0;
//         minutes++;
//     }
    
//     timerEl.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
//     timer();
// }

// function timer() {
//     timeNow = setTimeout(addTime, 1000);
// }

// function stop() {
//     clearTimeout(timeNow);
// }

// function clear() {
//     timerEl.textContent = "00:00";
//     seconds = 0;
//     minutes = 0;
// }