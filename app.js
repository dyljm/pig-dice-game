/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameInProgress;

initGame();

////////////////////////////////////
// New Game
document.querySelector('.btn-new').addEventListener('click', initGame);

////////////////////////////////////
// Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gameInProgress) {
        // Get a random number
        let dice = Math.floor(Math.random() * 6) + 1; // Gets a random number between 1 and 6
        // Display stuff
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'; // Shows the dice element
        diceDOM.src = 'dice-' + dice + '.png';
        // Update the score if 1 wasn't rolled
        if (dice !== 1) {
            // Add current score to round score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore; // Outputs the current round score
        } else {
            nextPlayersTurn();
        }
    }
});

////////////////////////////////////
// Hold Score
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gameInProgress) {
        // Add current score to the players global score
        scores[activePlayer] += roundScore;
        // Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // Check if the player has won
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameInProgress = false;
        } else {
            nextPlayersTurn();
        }
    }
});

function initGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gameInProgress = true;
    // Update UI
    document.querySelector('.dice').style.display = 'none'; // Hides the dice element
    document.getElementById('score-0').textContent = '0'; // Sets scores to 0
    document.getElementById('score-1').textContent = '0'; 
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0'; 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function nextPlayersTurn() {
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0; // Ternary operator!
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none'; // Hides the dice element
}