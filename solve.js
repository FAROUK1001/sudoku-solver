let numbers = [];
let table = document.querySelector('.table');
let button = document.querySelector('.button');

for (let i = 0; i < 9 ; i++) {
    numbers[i]=[];
    let row = document.createElement('tr');
    for(let j = 0; j < 9 ; j++) 
    {   
        let cell = document.createElement('td');
        numbers[i][j] = 0;
        cell.innerHTML = numbers[i][j];
        row.appendChild(cell);
    }
    table.appendChild(row);
}

numbers[0][0]= 8;
numbers[1][2]= 3;
numbers[1][3]= 6;
numbers[2][1]= 7;
numbers[2][4]= 9;
numbers[2][6]= 2;
numbers[3][1]= 5;
numbers[3][5]= 7;
numbers[4][4]= 4;
numbers[4][5]= 5;
numbers[4][6]= 7;
numbers[5][3]= 1;
numbers[5][7]= 3;
numbers[6][2]= 1;
numbers[6][5]= 3;
numbers[6][6]= 9;
numbers[6][7]= 8;
numbers[6][8]= 5;
updateTable(numbers,table);

function checkRow(matrix, rowIndex, num) {
    for (let i = 0; i < 9; i++) {
        if (matrix[rowIndex][i] === num) {
            return true;
        }
    }
    return false;
}

function checkColumn(matrix, columnIndex, num) {
    for (let i = 0; i < 9; i++) {
        if (matrix[i][columnIndex] === num) {
            return true;
        }
    }
    return false;
}

function checkBox(matrix, rowIndex, columnIndex, num) {
    const startRow = Math.floor(rowIndex / 3) * 3;
    const startColumn = Math.floor(columnIndex / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startColumn; j < startColumn + 3; j++) {
            if (matrix[i][j] === num) {
                return true;
            }
        }
    }
    return false;
}


function getPossibleNumbers(matrix, rowIndex, columnIndex) {
    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = possibleNumbers.length - 1; i >= 0; i--) {
        if (
            checkRow(matrix, rowIndex, possibleNumbers[i]) ||
            checkColumn(matrix, columnIndex, possibleNumbers[i]) ||
            checkBox(matrix, rowIndex, columnIndex, possibleNumbers[i])
        ) {
            possibleNumbers.splice(i, 1);
        }
    }

    return possibleNumbers;
}


function isSolved(matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const num = matrix[i][j];
            if (num !== 0) {
                matrix[i][j] = 0;
                if (
                    checkRow(matrix, i, num) ||
                    checkColumn(matrix, j, num) ||
                    checkBox(matrix, i, j, num)
                ) {
                    return false;
                }
                matrix[i][j] = num;
            }
        }
    }
    return true;
}



function notEmpty(matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

let time = 50;

async function solve(matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (
                        !checkRow(matrix, i, num) &&
                        !checkColumn(matrix, j, num) &&
                        !checkBox(matrix, i, j, num)
                    ) {
                        matrix[i][j] = num;
                        updateTable(numbers,table);
                        await new Promise(resolve => setTimeout(resolve, time));
                        if (await solve(matrix)) {
                            return true;
                        } else {
                            matrix[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}


button.addEventListener('click', function () {
  solve(numbers)
});

function updateTable(matrix, table) {
    let rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].cells;
        for (let j = 0; j < cells.length; j++) {
            cells[j].textContent = matrix[i][j];
        }
    }
} 