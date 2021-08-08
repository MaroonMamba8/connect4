const RED_CLASS = 'redchip'
const BLUE_CLASS = 'bluechip'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
var places = [6,6,6,6,6,6,6]

const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
let blueTurn

var WINNING_COMBINATIONS = []

for (var i = 0; i < 21; i++) {
    WINNING_COMBINATIONS.push([i,i+7,i+14,i+21]);
}

for (var i = 0; i < 42; i++) {
    if (i % 7 < 4) {
        WINNING_COMBINATIONS.push([i,i+1,i+2,i+3]);
    }
}

for (var i = 0; i < 21; i++) {
    if (i % 7 < 4) {
        WINNING_COMBINATIONS.push([i,i+8,i+16,i+24]);
    }
    if (i % 7 > 2) {
        WINNING_COMBINATIONS.push([i,i+6,i+12,i+18]);
    }
}

startGame() 

restartButton.addEventListener('click', startGame)

function startGame() {
    places = [6,6,6,6,6,6,6]
    blueTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(BLUE_CLASS)
        cell.classList.remove(RED_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick)
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('redshow')
    winningMessageElement.classList.remove('blueshow')
    winningMessageElement.classList.remove('draw')
}

function handleClick(e) {
    const clicked = e.target
    const clickedIndex = [...cellElements].indexOf(clicked) % 7
    if (places[clickedIndex] != 0) {
        const cell = cellElements[7*places[clickedIndex]-7 + clickedIndex]
        const currentClass = blueTurn ? BLUE_CLASS : RED_CLASS
        places[clickedIndex] = places[clickedIndex] - 1
        
        placeMark(cell, currentClass)
        if (checkWin(currentClass)) {
            endGame(false)
        } else if (isDraw()) {
            endGame(true)
        } else {
            swapTurns()
            setBoardHoverClass()
        }
    }
    // Check For Win
    // Check For Draw
    // Switch Turns
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    blueTurn = !blueTurn
}

function setBoardHoverClass() {
    board.classList.remove(RED_CLASS)
    board.classList.remove(BLUE_CLASS)
    if (blueTurn) {
        board.classList.add(BLUE_CLASS)
    } else {
        board.classList.add(RED_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = `Draw!`;
        winningMessageElement.classList.add('draw');
    } else {
        if (blueTurn) {
            winningMessageTextElement.innerText = `Blue Wins!`;
            winningMessageElement.classList.add('blueshow');
        } else {
            winningMessageTextElement.innerText = `Red Wins!`;
            winningMessageElement.classList.add('redshow');
        }
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(BLUE_CLASS) || cell.classList.contains(RED_CLASS);
    })
}
