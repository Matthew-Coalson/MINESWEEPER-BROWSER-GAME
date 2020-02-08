/*----- constants -----*/

class tile {
    constructor(tileState,) {
        this.tileState = tileState;
        this.adjacent = [];
    }
}


/*----- app's state (variables) -----*/

let columnCount = 10;
let rowCount = 8;
let bombCount = 10;
/*----- cached element references -----*/
/*----- event listeners -----*/
/*----- functions -----*/

function makeTiledBoard(board) {
    
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

//needs fixing
// function findBlankAdjacent(board) {
//     let y;
//     for (let i = 0; i < board.length; i++) {
//         y = i;
//         for(let i = 0; i < board[y].length; i++) {
//             if (board[y][i] === 0) {
//                 if (y + 1 < board.length && y - 1 >= 0 && i + 1 < board[y].length && i - 1 >= 0) {
//                     if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
//                     if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
//                     if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
//                     if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
//                     if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
//                     if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
//                     if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
//                     if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
//                 } else if (y - 1 < 0) {
//                     if (i - 1 < 0) {
//                         if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
//                         if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
//                         if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
//                     } else if (i + 1 > board[y].length - 1) {
//                         if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
//                         if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
//                         if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
//                     } else {
//                         if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
//                         if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
//                         if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
//                         if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
//                         if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
//                     }
//                 } else if (y + 1 > board.length - 1) {
//                     if (i - 1 < 0) {
//                         if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
//                         if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
//                         if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
//                     } else if (i + 1 > board[y].length - 1) {
//                         if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
//                         if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
//                         if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
//                     } else {
//                         if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
//                         if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
//                         if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
//                         if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
//                         if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
//                     }
//                 } else if (i - 1 < 0) {
//                     if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
//                     if (board[y - 1][i + 1] !== 'b') board[y - 1][i + 1] += 1;
//                     if (board[y][i + 1] !== 'b') board[y][i + 1] += 1;
//                     if (board[y + 1][i + 1] !== 'b') board[y + 1][i + 1] += 1;
//                     if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
//                 } else if (i + 1 > board[y].length - 1) {
//                     if (board[y - 1][i] !== 'b') board[y - 1][i] += 1;
//                     if (board[y - 1][i - 1] !== 'b') board[y - 1][i - 1] += 1;
//                     if (board[y][i - 1] !== 'b') board[y][i - 1] += 1;
//                     if (board[y + 1][i - 1] !== 'b') board[y + 1][i - 1] += 1;
//                     if (board[y + 1][i] !== 'b') board[y + 1][i] += 1;
//                 }
//             }
//         }
//     }
//     return board;
// }

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