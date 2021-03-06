const revealState = {
    tiles: {}
}

let boardLayout;
let columnCount = 10;
let rowCount = 8;
let bombCount = 10;
let revealedTiles = 0;
let seconds = 0;
let minutes = 0;
let timeNow;
let timerOn = false;
let endStatus = false;
let fCount;

const timerEl = document.querySelector('h2');
const boardEl = document.getElementById('board');
const difficultyEl = document.getElementById('difficulty');
const bodyEl = document.querySelector('body');
const replayBtnEl = document.getElementById('replay');
const endMsgEl = document.getElementById('end-msg');
const fCountEl = document.getElementById('f-count');

let tileEls = [];

boardEl.addEventListener('click', handleSqrClick);
boardEl.addEventListener('contextmenu', handleSqrRClick);
difficultyEl.addEventListener('click', handleDiffClick);
replayBtnEl.addEventListener('click', handleReplay);

init();

function init() {
    fCount = bombCount;
    revealedTiles = 0;
    endMsgEl.textContent = 'You lost!';
    difficultyEl.style.visibility = 'visible';
    endStatus = false;
    timerOn = false;
    boardLayout = findBombAdjacent(getBombs(columnCount, rowCount, bombCount));
    stop();
    clear();
    setRevealState(boardLayout);
    createBoard(boardLayout);
    getTileEls();
    render();  
}

function render() {
    renderBoard();
    if (endStatus === true) {
        toggleBodyState();
    }
    fCountEl.textContent = `${fCount}`;
}

function handleSqrClick(evt) {
    if (timerOn === false && endStatus !== true) {
        timer();
        timerOn = true;
        difficultyEl.style.visibility = 'hidden';
    }
    if (endStatus) return;
    if (revealState.tiles[parseInt(evt.target.id)] === 'f') return;
    if (boardLayout[parseInt(evt.target.id)] === 'b') {
        endStatus = true;
        stop();
        bombClick(parseInt(evt.target.id));
    }
    checkBlank(parseInt(evt.target.id));
    checkWinCon();
    render();
}

function handleDiffClick(evt) {
    if (evt.target.id === 'easy') {
        columnCount = 10;
        rowCount = 8;
        bombCount = 10;
    } 
    if (evt.target.id === 'medium') {
        columnCount = 18;
        rowCount = 14;
        bombCount = 40;
    }
    if (evt.target.id === 'hard') {
        columnCount = 24;
        rowCount = 20;
        bombCount = 99;
    }
    init();
}

function handleReplay() {
    toggleBodyState();
    init();
}

function handleSqrRClick(evt) {
     evt.preventDefault();
     if (revealState.tiles[parseInt(evt.target.id)] === 'h') {
        revealState.tiles[parseInt(evt.target.id)] = 'f';
        fCount--;
     } else if (revealState.tiles[parseInt(evt.target.id)] === 'f') {
        revealState.tiles[parseInt(evt.target.id)] = 'h';
        fCount++;
     }
     render();
}

function checkWinCon() {
    if (revealedTiles === columnCount * rowCount - bombCount) {
        endStatus = true;
        stop();
        endMsgEl.textContent = 'You won!';
    }
}

function bombClick(index) {
    revealState.tiles[index] = 'r';
    for (let i = 0; i < boardLayout.length; i++) {
        if (boardLayout[i] === 'b') {
            revealState.tiles[i] = 'r';
        }
    }
    endStatus = true;
}

function setRevealState(board) {
    for (let i = 0; i < board.length; i++) {
            revealState.tiles[i] = 'h';
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
            if (x < (columnCount - 1) && y > 0 && y <= (rowCount - 1) && board[i - columnCount + 1] !== 'b') board[i - columnCount + 1] += 1;
        }
    }
    return board;
}

function checkBlank(index) {
    if(boardLayout[index] !== 'b' && revealState.tiles[index] === 'h') {
        const x = index % columnCount;        
        const y = Math.floor(index / columnCount);
        revealedTiles++;
        revealState.tiles[index] = 'r';
        if (boardLayout[index] === 0) {
            if (x < (columnCount - 1) && revealState.tiles[index + 1] === 'h') checkBlank(index + 1);
            if (y < (rowCount - 1) && revealState.tiles[index + columnCount] === 'h') checkBlank(index + columnCount);
            if (x > 0 && revealState.tiles[index - 1] === 'h') checkBlank(index - 1);
            if (y > 0 && revealState.tiles[index - columnCount] === 'h') checkBlank(index - columnCount);
            if (x > 0 && y > 0 && revealState.tiles[index - columnCount - 1] === 'h') checkBlank(index - columnCount - 1);
            if (x > 0 && y < (rowCount - 1) && y < (rowCount - 1) && revealState.tiles[index + columnCount - 1] === 'h') checkBlank(index + columnCount - 1);
            if (x < (columnCount - 1) && y < (rowCount - 1) && revealState.tiles[index + columnCount + 1] === 'h') checkBlank(index + columnCount + 1);
            if (x < (columnCount - 1) && y > 0 && y <= (rowCount - 1) && revealState.tiles[index - columnCount + 1] === 'h') checkBlank(index - columnCount + 1);
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
            bombs--;
        }
    }
    return tempArr;
}

function getRandomIdx(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function renderBoard() {
    for (let i = 0; i < boardLayout.length; i++) {
        if (revealState.tiles[i] !== 'h') {
            if (revealState.tiles[i] === 'f') {
                tileEls[i].innerHTML = '<img src="imgs/flag.png">';
            } else if (boardLayout[i] === 'b') {
                tileEls[i].innerHTML = '<img src="imgs/bomb.png">';
            } else if (boardLayout[i] === 0) {
                tileEls[i].style.backgroundColor = '#638199';
            } else {
                tileEls[i].textContent = boardLayout[i];
            }

        }
        if (revealState.tiles[i] === 'h') {
            tileEls[i].innerHTML = '';
        }
    }
}

function getTileEls() {
    tileEls = [];
    for (let i = 0; i < boardLayout.length; i++) {
        tileEls.push(document.getElementById(`${i}`));
    }
}

function createBoard(board) {
    boardEl.innerHTML = "";
    for (let i = 0; i < board.length; i++) {
        boardEl.innerHTML += `<div class="tiles" id="${i}"></div>`;
    }
    boardEl.style.gridTemplate = `repeat(${rowCount}, 1fr) / repeat(${columnCount}, 1fr)`
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

function toggleBodyState() {
    bodyEl.classList.toggle('dialogIsOpen');
}