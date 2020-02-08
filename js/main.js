/*----- constants -----*/

const boardState = {
    tiles: {}
};
boardState.tiles[0] = 0;
console.log(boardState.tiles);
boardState.tiles[0][state] = 'b';
console.log(boardState.tiles[0].state);
boardState.tiles.tile[0].adjacent = [];
boardState.tiles.tile[0].adjacent.push('taco');

console.log(boardState);
console.log(boardState.tiles[0]);
boardState.tiles[1].adjacent.push('taco');
boardState.tiles[1].adjacent.push('bell');
console.log(boardstate.tiles.adjacent)

/*----- app's state (variables) -----*/

let columnCount = 10;
let rowCount = 8;
let bombCount = 10;
/*----- cached element references -----*/
makeTiledBoard(findBombAdjacent(getBombs(10, 8, 10)));
/*----- event listeners -----*/
/*----- functions -----*/

function makeTiledBoard(board) {
    let y;
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        y = i;
        for(let i = 0; i < board[y].length; i++) {
            boardState.tiles[count] = board[y][i];
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