document.addEventListener('DOMContentLoaded', () => {
    const player1Section = document.getElementById('player1-section');
    const player1SecretInput = document.getElementById('player1-secret-input');
    const setSecretBtn = document.getElementById('set-secret-btn');
    const player1Error = document.getElementById('player1-error');

    const guessSection = document.getElementById('guess-section');
    const currentPlayerDisplay = document.getElementById('current-player-display');
    const guessInput = document.getElementById('guess-input');
    const submitGuessBtn = document.getElementById('submit-guess-btn');
    const messageDisplay = document.getElementById('message');
    const attemptsLeftDisplay = document.getElementById('attempts-left');

    const resultSection = document.getElementById('result-section');
    const gameResultDisplay = document.getElementById('game-result');
    const playAgainBtn = document.getElementById('play-again-btn');

    let secretNumber = 0;
    let currentPlayer = 2; // Starts with Player 2
    let attempts = 5;
    const maxAttempts = 5;

    // --- Player 1 Logic ---
    setSecretBtn.addEventListener('click', () => {
        const secret = parseInt(player1SecretInput.value);

        if (isNaN(secret) || secret < 1 || secret > 10) {
            player1Error.textContent = 'Please enter a valid number between 1 and 10.';
            return;
        }

        secretNumber = secret;
        player1Error.textContent = ''; // Clear any previous error
        player1Section.classList.add('hidden');
        guessSection.classList.remove('hidden');
        resetGameForNewPlayer();
    });

    // --- Guessing Game Logic ---
    submitGuessBtn.addEventListener('click', () => {
        const guess = parseInt(guessInput.value);

        if (isNaN(guess) || guess < 1 || guess > 10) {
            messageDisplay.textContent = 'Please enter a valid guess between 1 and 10.';
            return;
        }

        attempts--;
        attemptsLeftDisplay.textContent = attempts;

        if (guess === secretNumber) {
            displayResult(`Player ${currentPlayer} wins! You guessed the number!`);
            guessSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
        } else if (attempts === 0) {
            if (currentPlayer === 2) {
                currentPlayer = 3;
                resetGameForNewPlayer();
                messageDisplay.textContent = 'Player 2 ran out of attempts. Now it\'s Player 3\'s turn!';
            } else if (currentPlayer === 3) {
                displayResult(`Player 1 wins! Neither Player 2 nor Player 3 could guess the number.`);
                gameResultDisplay.classList.add('loser');
                guessSection.classList.add('hidden');
                resultSection.classList.remove('hidden');
            }
        } else {
            messageDisplay.textContent = guess < secretNumber ? 'Too low! Try again.' : 'Too high! Try again.';
        }

        guessInput.value = ''; // Clear input after guess
    });

    // --- Reset and Display Functions ---
    function resetGameForNewPlayer() {
        attempts = maxAttempts;
        attemptsLeftDisplay.textContent = attempts;
        currentPlayerDisplay.textContent = `Player ${currentPlayer}: Guess the Number`;
        messageDisplay.textContent = '';
        guessInput.value = '';
    }

    function displayResult(message) {
        gameResultDisplay.textContent = message;
        gameResultDisplay.classList.remove('loser'); // Reset loser class
    }

    playAgainBtn.addEventListener('click', () => {
        // Reset all game state
        secretNumber = 0;
        currentPlayer = 2;
        attempts = maxAttempts;

        // Show Player 1 section
        player1Section.classList.remove('hidden');
        player1SecretInput.value = '';
        player1Error.textContent = '';

        // Hide other sections
        guessSection.classList.add('hidden');
        resultSection.classList.add('hidden');

        // Reset guess section displays
        resetGameForNewPlayer();
    });
});