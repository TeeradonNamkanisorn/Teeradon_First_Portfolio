let moveBox = document.querySelector('.playerMove');
let moveSet = ['rock', 'paper', 'scissor'];
let moveItems = [];
let playerInput;
let computerResponse;
let outcome;
let resetButton = document.querySelector('#reset');

let winRecord = 0;
let lossRecord = 0;
let drawRecord = 0;
let streakRecord = 0;
moveSet.forEach( item => moveItems.push(document.getElementById(item)))
function playByButton(event) {
    playerInput = event.target.id;
    responseAndDisplay();
}
function itemPopUp(button) {
    button.onclick = playByButton;
}
moveItems.forEach(itemPopUp)

function generateRandomComputerResponse() {
    let index = Math.floor(3*Math.random())
    switch (index) {
        case 0: computerResponse = 'rock'; break;
        case 1: computerResponse = 'paper'; break;
        case 2: computerResponse = 'scissor'; break;
        default: alert('error!');
    }
}

function evaluateOutcome(human, comp) {
 if (human === comp) {
     outcome = 'draw';
 } else {
     if (human === 'rock') {
         if (comp === 'paper') {
             outcome = 'loss';
         } else if (comp === 'scissor') {
             outcome = 'win';
         }
     } else if (human === 'paper') {
         if (comp === 'rock') {
             outcome = 'win';
         } else if (comp === 'scissor') {
             outcome = 'loss'
         }
     } else if (human === 'scissor') {
         if (comp === 'rock') {
             outcome = 'loss';
         } else if (comp === 'paper') {
             outcome = 'win'
         }
     } else {
         alert('Error!!!')
     }
 }
 const printedValue = outcome;
 return printedValue;
}

function displayStats() {
    document.querySelector('#winDisplay').innerHTML = winRecord;
    document.querySelector('#lossDisplay').innerHTML = lossRecord;
    document.querySelector('#drawDisplay').innerHTML = drawRecord;
    document.querySelector('#streakDisplay').innerHTML = streakRecord;
}

function updateScore(winOrLossOrDraw) {
    switch (winOrLossOrDraw) {
        case "win": winRecord += 1; streakRecord ++; break;
        case "loss": lossRecord += 1; streakRecord = 0; break;
        case "draw": drawRecord += 1; streakRecord = 0; break;
        default: alert('Update score error');
    }
}

function showComputersMove(comResponse) {
    let imageLink;
    let comImage = document.getElementById('computersPlay')
    switch (comResponse) {
        case 'rock': imageLink = "url('rock.png')"; break;
        case 'paper': imageLink = "url('paper.png')"; break;
        case 'scissor': imageLink = "url('scissors.png')"; break;
        default: alert('Computer Response Image Error'); break;
    }
    comImage.style.backgroundImage = imageLink;
    comImage.style.backgroundRepeat = 'no-repeat';
}

function responseAndDisplay() {
    generateRandomComputerResponse();
    showComputersMove(computerResponse);
    evaluateOutcome(playerInput,computerResponse);
    updateScore(evaluateOutcome(playerInput,computerResponse));
    displayStats();
    autoCloseGameResult();
}
function playByKeyboard(event) {
    const pressedKey = event.key;
    const eligibleKeys = ['1','2','3'];
    if (eligibleKeys.includes(pressedKey)) {
        switch (pressedKey) {
            case '1': playerInput = 'rock'; break;
            case '2': playerInput = 'paper'; break;
            case '3': playerInput = 'scissor'; break;
            default: alert("Keyboard Input Error");break; 
        }
        responseAndDisplay();   
    }
    
}

function autoCloseGameResult() {
    const popupBlock = document.getElementById('myModal')
    popupBlock.style.display = "block";
    const blockContent = document.getElementById('modalContent');
    const blockText = document.getElementById('modalText');
    blockText.innerHTML = "Your match result: "+outcome;
    switch (outcome) {
        case 'win': blockContent.style.backgroundColor = 'blue';break;
        case 'loss': blockContent.style.backgroundColor = 'red';break;
        case 'draw': blockContent.style.backgroundColor = 'green';break;
    }
    document.addEventListener('keyup',function (event2) {
        if (event2.key === ' ') {
            popupBlock.style.display = 'none';
        }
    })
    setTimeout(function () {popupBlock.style.display = "none"},3000)
}

resetButton.onclick = () => {
        winRecord = 0;
        lossRecord = 0;
        drawRecord = 0;
        streakRecord = 0;
        displayStats();
}

document.addEventListener('keyup',playByKeyboard)


