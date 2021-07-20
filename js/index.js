const choices = document.querySelectorAll('.choice'); // select all the queries having class choice
const score = document.getElementById('scores');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');

const scoreboard = {
    player: 0,
    computer: 0
}

// play game,it will return which icon is clicked
function play(e) {
    // as soon as a choice is made we want our restart button to show up
    restart.style.display = 'inline-block';

    // target is used to get the element that triggered a specific event
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();

    const winner = getWinner(playerChoice, computerChoice)
    showWinner(winner, computerChoice)
}

// Event listeners ,chekcing for click event
choices.forEach(choice => choice.addEventListener('click', play))

// Getting Computer's choice
function getComputerChoice() {
    const rand = Math.random();
    if (rand < 0.34)
        return 'rock';
    else if (rand <= 0.67)
        return 'paper';
    return 'scissors';
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice == computerChoice)
        return 'draw';
    else if ((playerChoice == 'rock' && computerChoice == 'scissors') || (playerChoice == 'paper' && computerChoice == 'rock') || (playerChoice == 'scissors' && computerChoice == 'paper'))
        return 'player';
    else
        return 'computer';
}

// to show the winner and choice of the computer
function showWinner(winner, computerChoice) {
    if (winner == 'player') {
        scoreboard.player++;
        // show modal result
        result.innerHTML = `
            <h1 class="text-win">You Win</h1>
            <i class="fas fa-hand-${computerChoice} fa-6x"></i>
            <p>Computer Chose <strong>${computerChoice}</strong></p>`;
    }
    else if (winner == 'computer') {
        scoreboard.computer++;
        // show modal result
        result.innerHTML = `
            <h1 class="text-lose">You Lose</h1>
            <i class="fas fa-hand-${computerChoice} fa-6x"></i>
            <p>Computer Chose <strong>${computerChoice}</strong></p>`;
    }
    else {
        result.innerHTML = `
            <h1>It's Draw</h1>
            <i class="fas fa-hand-${computerChoice} fa-6x"></i>
            <p>Computer Chose <strong>${computerChoice}</strong></p>`;
    }

    // updating score
    score.innerHTML = `
        <p id="player">Player : ${scoreboard.player}</p>
        <p id="computer">Computer : ${scoreboard.computer}</p>`;

    modal.style.display = 'block';
}

function reset() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    restart.style.display = 'none';
    // resetting score board
    score.innerHTML = `
        <p id="player">Player : ${scoreboard.player}</p>
        <p id="computer">Computer : ${scoreboard.computer}</p>`;
}
// setting score if restart game is clicked
restart.addEventListener('click', reset);

function closeResultScreen(e) {
    // when result screen(modal) is open,we know that our modal has display
    // widhth and height of 100%,so when we click anywhere on the screen,everyplace is modal
    // clicking on the result box,means clicking on the result not modal
    if (e.target == modal)
        modal.style.display = 'none';
}
// closing result screen, on clicking anywhere in window
window.addEventListener('click', closeResultScreen);