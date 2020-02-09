/*----- constants -----*/

const boardState = {
    tiles: {}
}; 
const revealState = {
    tiles: {}
}
const timerEl = document.querySelector('h2');
// timer();

// timer;


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
boardLayout = makeTiledBoard(findBombAdjacent(getBombs(10, 8, 10)));
/*----- event listeners -----*/
/*----- functions -----*/
function checkWinCon() {
    return revealedTiles === columnCount * rowCount - bombCount;
}

function makeTiledBoard(board) {
    let y;
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        y = i;
        for(let i = 0; i < board[y].length; i++) {
            boardState.tiles[count] = board[y][i];
            revealState.tiles[count] = 'h';
            count += 1;
        }
    }
}


function findBombAdjacent(board) {
    let y;
    for (let i = 0; i < board.length; i++) {
        y = i;
        for(let i = 0; i < board[y].length; i++) {
            if (board[y][i] === 'b') {
                if (y + 1 < board.length && y - 1 >= 0 && i + 1 < board[y].length && i - 1 >= 0) {
                    if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
                    if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
                    if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
                    if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
                    if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
                    if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
                    if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
                    if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
                } else if (y - 1 < 0) {
                    if (i - 1 < 0) {
                        if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
                        if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
                        if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
                    } else if (i + 1 > board[y].length - 1) {
                        if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
                        if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
                        if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
                    } else {
                        if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
                        if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
                        if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
                        if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
                        if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
                    }
                } else if (y + 1 > board.length - 1) {
                    if (i - 1 < 0) {
                        if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
                        if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
                        if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
                    } else if (i + 1 > board[y].length - 1) {
                        if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
                        if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
                        if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
                    } else {
                        if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
                        if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
                        if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
                        if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
                        if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
                    }
                } else if (i - 1 < 0) {
                    if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
                    if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
                    if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
                    if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
                    if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
                } else if (i + 1 > board[y].length - 1) {
                    if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
                    if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
                    if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
                    if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
                    if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
                }
            }
        }
    }
    return board;
}

function checkBlank(index) {
    if(boardLayout[index] !== 'b' && revealState[index] === 'h') {
        const x = index % columnCount;        
        const y = Math.floor( index / columnCount);
        revealedTiles++;
        reavealState[index] = 'r';
        if(boardLayout[index] === 0) {
            if(x > 0 && revealState[index - 1] === 'h') checkBlank(index - 1);
            if(y > 0 && revealState[index - columnCount] === 'h') checkBlank(index - columnCount);
            if(x > 0 && y > 0 && revealState[index - columnCount - 1] === 'h') checkBlank(index - columnCount - 1);
            if(x > 0 && y < (rowCount - 1) && y < (rowCount - 1) && revealState[index + columnCount - 1] === 'h') checkBlank(index + columnCount - 1);
            if(x < (columnCount - 1) && revealState[index + 1] === 'h') checkBlank(index + 1);
            if(y < (rowCount - 1) && revealState[index + columnCount] === 'h') checkBlank(index + columnCount);
            if(x < (columnCount - 1) && y < (rowCount - 1) && revealState[index + columnCount + 1] === 'h') checkBlank(index + columnCount + 1);
            if(x < (columnCount - 1) && y > 0 && y < (rowCount - 1) && revealState[index - columnCount + 1] === 'h') checkBlank(index - columnCount + 1);
        }
    }
}

function getBombs(columns, rows, bombs) {
    let tempRowArr = new Array(columns).fill(0);
    let tempArr = [];
    let x, y;
    for (let i = 0; i < rows; i++) {
        tempArr.push(tempRowArr.slice());
    }
    while (bombs > 0) {
        x = getRandomIdx(rows);
        y = getRandomIdx(columns);
        if (tempArr[x][y] === 0) {
            tempArr[x][y] = 'b';
            bombs -= 1;
        }
    }
    return tempArr;
}

function getRandomIdx(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function addTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    
    timerEl.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    timeNow = setTimeout(addTime, 1000);
}

function stop() {
    clearTimeout(timeNow);
}

function clear() {
    timerEl.textContent = "00:00";
    seconds = 0;
    minutes = 0;
}