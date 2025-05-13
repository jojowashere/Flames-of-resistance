/**
 * Flames of Resistance: A Fahrenheit 451-inspired board game
 * Main game logic
 */

// Global game state
const gameState = {
    players: [],
    currentPlayerIndex: 0,
    knowledgePoints: 0,
    censorshipLevel: 0,
    knowledgeTarget: 30,       // Points needed for collective win
    censorshipMax: 20,         // Censorship limit before losing
    targetBooks: 10,           // Number of books needed for individual win
    gameStarted: false,
    gameOver: false,
    pathSelection: false,      // Flag for path selection mode
    availablePaths: []         // Available paths during path selection
};

// DOM elements
const startGameBtn = document.getElementById('start-game-btn');
const gameSetup = document.getElementById('game-setup');
const characterSelection = document.getElementById('character-selection');
const gameBoard = document.getElementById('game-board');
const playerFormsContainer = document.getElementById('player-forms-container');
const confirmPlayersBtn = document.getElementById('confirm-players-btn');
const charactersGrid = document.getElementById('characters-grid');
const currentPlayerName = document.getElementById('current-player-name');
const currentPlayerCharacter = document.getElementById('current-player-character');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const endTurnBtn = document.getElementById('end-turn-btn');
const diceElement = document.getElementById('dice');
const diceResult = document.getElementById('dice-result');
const playersStatus = document.getElementById('players-status');
const knowledgeProgress = document.getElementById('knowledge-progress');
const knowledgeValue = document.getElementById('knowledge-value');
const knowledgeTarget = document.getElementById('knowledge-target');
const censorshipProgress = document.getElementById('censorship-progress');
const censorshipValue = document.getElementById('censorship-value');
const censorshipMax = document.getElementById('censorship-max');
const triviaPopup = document.getElementById('trivia-popup');
const triviaQuestion = document.getElementById('trivia-question');
const triviaOptions = document.getElementById('trivia-options');
const triviaResult = document.getElementById('trivia-result');
const triviaContinueBtn = document.getElementById('trivia-continue-btn');
const eventPopup = document.getElementById('event-popup');
const eventDescription = document.getElementById('event-description');
const eventContinueBtn = document.getElementById('event-continue-btn');
const gameOverPopup = document.getElementById('game-over-popup');
const gameResultTitle = document.getElementById('game-result-title');
const gameResultMessage = document.getElementById('game-result-message');
const finalScores = document.getElementById('final-scores');
const newGameBtn = document.getElementById('new-game-btn');
const boardGrid = document.getElementById('board-grid');

// Event listeners
document.addEventListener('DOMContentLoaded', initializeGame);
startGameBtn.addEventListener('click', showGameSetup);
confirmPlayersBtn.addEventListener('click', confirmPlayers);
rollDiceBtn.addEventListener('click', rollDice);
endTurnBtn.addEventListener('click', endTurn);
triviaContinueBtn.addEventListener('click', closeTrivia);
eventContinueBtn.addEventListener('click', closeEvent);
newGameBtn.addEventListener('click', resetGame);

/**
 * Initialize the game setup
 */
function initializeGame() {
    // Set knowledge target and censorship max in the UI
    knowledgeTarget.textContent = gameState.knowledgeTarget;
    censorshipMax.textContent = gameState.censorshipMax;
    
    // Add event listeners to player count buttons
    const playerCountBtns = document.querySelectorAll('.player-count-btn');
    playerCountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playerCountBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const playerCount = parseInt(btn.dataset.count);
            createPlayerForms(playerCount);
        });
    });
}

/**
 * Show the game setup screen
 */
function showGameSetup() {
    gameSetup.classList.remove('hidden');
    startGameBtn.parentElement.classList.add('hidden');
}

/**
 * Create player input forms based on selected player count
 */
function createPlayerForms(count) {
    playerFormsContainer.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
        const playerForm = document.createElement('div');
        playerForm.classList.add('player-form');
        playerForm.innerHTML = `
            <h4>Player ${i}</h4>
            <div class="form-group">
                <label for="player-${i}-name">Name:</label>
                <input type="text" id="player-${i}-name" placeholder="Enter player name" required>
            </div>
        `;
        playerFormsContainer.appendChild(playerForm);
    }
    
    confirmPlayersBtn.disabled = false;
}

/**
 * Confirm players and proceed to character selection
 */
function confirmPlayers() {
    const playerInputs = document.querySelectorAll('[id^="player-"][id$="-name"]');
    let validInputs = true;
    
    // Check if all inputs are filled
    playerInputs.forEach(input => {
        if (!input.value.trim()) {
            validInputs = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (!validInputs) return;
    
    // Clear previous players
    gameState.players = [];
    
    // Create player objects
    playerInputs.forEach(input => {
        const playerName = input.value.trim();
        gameState.players.push({
            name: playerName,
            character: null,
            position: 0,
            books: 0,
            knowledge: 0
        });
    });
    
    // Show character selection
    gameSetup.classList.add('hidden');
    characterSelection.classList.remove('hidden');
    
    // Populate character selection grid
    populateCharacterSelection();
}

/**
 * Populate the character selection grid
 */
function populateCharacterSelection() {
    charactersGrid.innerHTML = '';
    
    // Create a character card for each character
    characters.forEach((character, index) => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        characterCard.dataset.index = index;
        
        characterCard.innerHTML = `
            <div class="character-icon"><i class="${character.icon}"></i></div>
            <div class="character-name">${character.name}</div>
            <div class="character-description">${character.description}</div>
            <div class="character-ability">Ability: ${character.ability}</div>
        `;
        
        characterCard.addEventListener('click', () => selectCharacter(index));
        charactersGrid.appendChild(characterCard);
    });
    
    // Add confirmation button
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('confirm-btn');
    confirmBtn.textContent = 'Start Game';
    confirmBtn.id = 'start-game-confirm-btn'; // Changed ID to avoid conflict
    confirmBtn.disabled = true;
    confirmBtn.addEventListener('click', startGame);
    
    const btnContainer = document.createElement('div');
    btnContainer.style.textAlign = 'center';
    btnContainer.appendChild(confirmBtn);
    characterSelection.appendChild(btnContainer);
}

/**
 * Select a character for the current player
 */
function selectCharacter(characterIndex) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    currentPlayer.character = characters[characterIndex];
    
    // Update UI to show selection
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => card.classList.remove('selected'));
    characterCards[characterIndex].classList.add('selected');
    
    // Move to next player or start game if all players have selected characters
    gameState.currentPlayerIndex++;
    
    if (gameState.currentPlayerIndex < gameState.players.length) {
        // Show next player selection
        alert(`${currentPlayer.name} selected ${currentPlayer.character.name}. Now ${gameState.players[gameState.currentPlayerIndex].name}, select your character!`);
    } else {
        // All players have selected characters
        document.getElementById('start-game-confirm-btn').disabled = false;
    }
}

/**
 * Start the game with the selected players and characters
 */
function startGame() {
    // Reset current player to the first player
    gameState.currentPlayerIndex = 0;
    gameState.gameStarted = true;
    
    // Hide character selection and show game board
    characterSelection.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    
    // Initialize game board
    initializeBoard();
    
    // Update UI with initial game state
    updateGameUI();
}

/**
 * Initialize the game board
 */
function initializeBoard() {
    // Create board spaces
    boardGrid.innerHTML = '';
    
    for (let i = 0; i < boardSpaces.length; i++) {
        const space = boardSpaces[i];
        const spaceElement = document.createElement('div');
        spaceElement.classList.add('board-space');
        spaceElement.classList.add(space.type);
        spaceElement.dataset.index = i;
        
        // Build connection indicators
        let connectionsHTML = '';
        if (space.connections && space.connections.length > 0) {
            const connectionCount = space.connections.length;
            let connectionDots = '';
            
            for (let j = 0; j < connectionCount; j++) {
                const connectedSpaceIndex = space.connections[j];
                const connectedSpace = boardSpaces[connectedSpaceIndex];
                connectionDots += `<span class="connection-dot ${connectedSpace.type}" title="Connects to ${connectedSpace.name}"></span>`;
            }
            
            connectionsHTML = `<div class="space-connections">${connectionDots}</div>`;
        }
        
        spaceElement.innerHTML = `
            <div class="space-icon"><i class="${space.icon}"></i></div>
            <div class="space-name">${space.name}</div>
            ${connectionsHTML}
        `;
        
        // Add tooltip showing connections
        if (space.connections && space.connections.length > 0) {
            let connectionNames = space.connections.map(idx => boardSpaces[idx].name).join(', ');
            spaceElement.title = `Connects to: ${connectionNames}`;
        }
        
        boardGrid.appendChild(spaceElement);
    }
    
    // Place all players at the starting position
    updatePlayerPositions();
}

/**
 * Update the positions of all player tokens on the board
 */
function updatePlayerPositions() {
    // Remove all player tokens
    const existingTokens = document.querySelectorAll('.player-token');
    existingTokens.forEach(token => token.remove());
    
    // Add player tokens to their current positions
    gameState.players.forEach((player, index) => {
        const playerPosition = player.position;
        const spaceElement = document.querySelector(`.board-space[data-index="${playerPosition}"]`);
        
        if (spaceElement) {
            const playerToken = document.createElement('div');
            playerToken.classList.add('player-token', `player-token-${index + 1}`);
            spaceElement.appendChild(playerToken);
        }
    });
}

/**
 * Update all game UI elements based on current state
 */
function updateGameUI() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Update current player info
    currentPlayerName.textContent = currentPlayer.name;
    currentPlayerCharacter.textContent = currentPlayer.character.name;
    
    // Update player status sidebar
    updatePlayerStatus();
    
    // Update knowledge meter
    const knowledgePercentage = (gameState.knowledgePoints / gameState.knowledgeTarget) * 100;
    knowledgeProgress.style.width = `${Math.min(knowledgePercentage, 100)}%`;
    knowledgeValue.textContent = gameState.knowledgePoints;
    
    // Update censorship meter
    const censorshipPercentage = (gameState.censorshipLevel / gameState.censorshipMax) * 100;
    censorshipProgress.style.width = `${Math.min(censorshipPercentage, 100)}%`;
    censorshipValue.textContent = gameState.censorshipLevel;
    
    // Update player positions on the board
    updatePlayerPositions();
    
    // Enable/disable buttons based on game state
    rollDiceBtn.disabled = false;
    endTurnBtn.disabled = true;
}

/**
 * Update the player status sidebar
 */
function updatePlayerStatus() {
    playersStatus.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const isCurrentPlayer = index === gameState.currentPlayerIndex;
        const playerStatusElement = document.createElement('div');
        playerStatusElement.classList.add('player-status');
        if (isCurrentPlayer) playerStatusElement.classList.add('active');
        
        // Build inventory section if player has items
        let inventoryHTML = '';
        if (player.inventory && player.inventory.length > 0) {
            const itemList = player.inventory.map(item => 
                `<div class="inventory-item" title="${item.effect}">
                    <i class="${item.icon}"></i> ${item.name}
                </div>`
            ).join('');
            
            inventoryHTML = `
                <div class="player-inventory">
                    <div class="inventory-header">Items:</div>
                    <div class="inventory-list">${itemList}</div>
                </div>
            `;
        }
        
        // Show books with progress toward winning
        const booksProgress = Math.min(100, (player.books / gameState.targetBooks) * 100);
        
        playerStatusElement.innerHTML = `
            <h4>
                <span>${player.name} (${player.character.name})</span>
                <span class="book-counter" title="First to collect ${gameState.targetBooks} books wins!">
                    <i class="fas fa-book"></i> ${player.books}/${gameState.targetBooks}
                </span>
            </h4>
            <div class="books-progress">
                <div class="books-bar" style="width: ${booksProgress}%"></div>
            </div>
            <div class="player-knowledge">Knowledge Points: ${player.knowledge}</div>
            ${inventoryHTML}
        `;
        
        // For current player, add "Use item" buttons if they have an inventory
        if (isCurrentPlayer && player.inventory && player.inventory.length > 0) {
            const inventoryItems = playerStatusElement.querySelectorAll('.inventory-item');
            inventoryItems.forEach((itemElement, itemIndex) => {
                itemElement.classList.add('usable');
                itemElement.addEventListener('click', () => useItem(index, itemIndex));
            });
        }
        
        playersStatus.appendChild(playerStatusElement);
    });
}

/**
 * Roll the dice and move the current player
 */
function rollDice() {
    // Disable roll button during animation
    rollDiceBtn.disabled = true;
    
    // Animate dice rolling
    diceElement.classList.add('rolling');
    diceResult.textContent = '?';
    
    // Simulate rolling delay
    setTimeout(() => {
        // Generate random dice result (1-6)
        const roll = Math.floor(Math.random() * 6) + 1;
        
        // Update dice display
        diceElement.classList.remove('rolling');
        diceResult.textContent = roll;
        
        // Move player
        movePlayer(roll);
        
        // Enable end turn button
        endTurnBtn.disabled = false;
    }, 1000);
}

/**
 * Move the current player based on dice roll
 */
function movePlayer(spaces) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // If player has pathChoiceTurns from using Book People Map, go into path selection mode
    if (currentPlayer.pathChoiceTurns > 0) {
        // Get connected spaces from current position
        const currentPosition = currentPlayer.position;
        const connections = boardSpaces[currentPosition].connections;
        
        if (connections && connections.length > 0) {
            gameState.pathSelection = true;
            gameState.availablePaths = connections;
            showPathSelection();
            return;
        }
    }
    
    // For players with doubleRoll ability (from Clarisse's Journal)
    if (currentPlayer.doubleRoll) {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        spaces = Math.max(roll1, roll2);
        currentPlayer.doubleRoll = false;
        alert(`${currentPlayer.name} rolls twice: ${roll1} and ${roll2}. Moving ${spaces} spaces!`);
    }
    
    // Without path selection, handle normal movement based on dice roll
    handleRegularMovement(spaces);
}

/**
 * Handle regular movement without path choice
 */
function handleRegularMovement(spaces) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Get possible connections from current position
    const currentPosition = currentPlayer.position;
    const currentSpace = boardSpaces[currentPosition];
    
    if (currentSpace.connections && currentSpace.connections.length > 0) {
        // If there are multiple paths, allow player to choose
        if (currentSpace.connections.length > 1) {
            gameState.pathSelection = true;
            gameState.availablePaths = currentSpace.connections;
            showPathSelection();
            return;
        } else {
            // Only one path, move to that space
            const newPosition = currentSpace.connections[0];
            currentPlayer.position = newPosition;
        }
    } else {
        // Fallback to old behavior if no connections defined
        const boardSize = boardSpaces.length;
        const newPosition = (currentPosition + spaces) % boardSize;
        currentPlayer.position = newPosition;
    }
    
    // Update board display
    updatePlayerPositions();
    
    // Handle space effect
    const newSpace = boardSpaces[currentPlayer.position];
    
    // Small delay before triggering space effect
    setTimeout(() => {
        handleSpaceEffect(newSpace);
    }, 500);
}

/**
 * Show path selection interface
 */
function showPathSelection() {
    // Create path selection popup if it doesn't exist
    if (!document.getElementById('path-selection-popup')) {
        createPathSelectionElements();
    }
    
    const pathSelectionPopup = document.getElementById('path-selection-popup');
    const pathOptions = document.getElementById('path-options');
    
    // Clear previous options
    pathOptions.innerHTML = '';
    
    // Show available paths
    gameState.availablePaths.forEach((pathIndex) => {
        const pathSpace = boardSpaces[pathIndex];
        const pathButton = document.createElement('button');
        pathButton.classList.add('path-option');
        pathButton.classList.add(pathSpace.type);
        
        pathButton.innerHTML = `
            <div class="path-icon"><i class="${pathSpace.icon}"></i></div>
            <div class="path-name">${pathSpace.name}</div>
            <div class="path-type">${capitalizeFirstLetter(pathSpace.type)} Space</div>
        `;
        
        pathButton.addEventListener('click', () => selectPath(pathIndex));
        pathOptions.appendChild(pathButton);
    });
    
    // Show the path selection popup
    pathSelectionPopup.classList.remove('hidden');
}

/**
 * Create path selection UI elements
 */
function createPathSelectionElements() {
    const pathSelectionPopup = document.createElement('div');
    pathSelectionPopup.id = 'path-selection-popup';
    pathSelectionPopup.classList.add('popup', 'hidden');
    
    const pathContent = document.createElement('div');
    pathContent.classList.add('popup-content');
    
    pathContent.innerHTML = `
        <h2>Choose Your Path</h2>
        <p>Select which path you want to take:</p>
        <div id="path-options" class="path-options"></div>
    `;
    
    pathSelectionPopup.appendChild(pathContent);
    document.querySelector('.game-container').appendChild(pathSelectionPopup);
}

/**
 * Select a path during path selection
 */
function selectPath(pathIndex) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Update player position
    currentPlayer.position = pathIndex;
    
    // If using Book People Map, decrease remaining turns
    if (currentPlayer.pathChoiceTurns > 0) {
        currentPlayer.pathChoiceTurns--;
    }
    
    // Hide path selection popup
    document.getElementById('path-selection-popup').classList.add('hidden');
    
    // Reset path selection state
    gameState.pathSelection = false;
    gameState.availablePaths = [];
    
    // Update board display
    updatePlayerPositions();
    
    // Handle space effect
    const newSpace = boardSpaces[pathIndex];
    setTimeout(() => {
        handleSpaceEffect(newSpace);
    }, 500);
}

/**
 * Helper function to capitalize first letter
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Handle the effect of the space the player landed on
 */
function handleSpaceEffect(space) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    switch (space.type) {
        case 'trivia':
            // If player has Faber's Green Bullet, auto-answer correctly
            if (currentPlayer.autoAnswerTrivia) {
                currentPlayer.autoAnswerTrivia = false;
                
                // Simulate correct answer
                gameState.knowledgePoints += 2;
                currentPlayer.knowledge += 2;
                if (currentPlayer.character.name === "Clarisse") {
                    gameState.knowledgePoints++;
                    currentPlayer.knowledge++;
                }
                
                alert(`${currentPlayer.name} used Faber's Green Bullet to automatically answer the trivia correctly! +2 Knowledge Points.`);
                
                // Check win conditions
                checkWinCondition();
                checkIndividualWinCondition(currentPlayer);
                
                // Update UI and end turn
                updateGameUI();
                setTimeout(() => endTurn(), 500);
            } else {
                // Show normal trivia question
                showTriviaQuestion();
            }
            break;
            
        case 'book':
            // Player found a book
            currentPlayer.books++;
            gameState.knowledgePoints++;
            currentPlayer.knowledge++;
            alert(`${currentPlayer.name} found a book! +1 Knowledge Point.`);
            
            // Check both win conditions
            checkWinCondition();
            checkIndividualWinCondition(currentPlayer);
            
            // Update UI
            updateGameUI();
            
            // End turn after processing book effect
            setTimeout(() => endTurn(), 500);
            break;
            
        case 'event':
            // Trigger a random event
            showRandomEvent();
            break;
            
        case 'danger':
            // Check if player has immunity from Mechanical Hound Repellent
            if (currentPlayer.dangerImmunity) {
                currentPlayer.dangerImmunity = false;
                alert(`${currentPlayer.name} is protected from the danger by the Mechanical Hound Repellent!`);
                
                // End turn without effect
                setTimeout(() => endTurn(), 500);
            } 
            // Check if Mildred character ability applies
            else if (currentPlayer.character.name === "Mildred" && !currentPlayer.usedImmunity) {
                currentPlayer.usedImmunity = true;
                alert(`${currentPlayer.name} uses ${currentPlayer.character.name}'s ability to avoid a fireman encounter!`);
                
                // End turn without effect
                setTimeout(() => endTurn(), 500);
            }
            else {
                // Player encountered danger
                gameState.censorshipLevel++;
                alert(`${currentPlayer.name} encountered the firemen! Censorship level increased.`);
                
                // Check lose condition
                checkLoseCondition();
                
                // Update UI
                updateGameUI();
                
                // End turn after processing danger effect
                setTimeout(() => endTurn(), 500);
            }
            break;
            
        case 'safe-house':
            // Player found a safe house
            alert(`${currentPlayer.name} found a safe house. You're safe for now.`);
            
            // Apply character ability if applicable
            if (currentPlayer.character.name === "Faber") {
                gameState.knowledgePoints += 2;
                currentPlayer.knowledge += 2;
                alert(`${currentPlayer.character.name}'s ability activated: +2 Knowledge Points at safe houses.`);
                checkWinCondition();
                checkIndividualWinCondition(currentPlayer);
                updateGameUI();
            }
            
            // End turn after safe house
            setTimeout(() => endTurn(), 500);
            break;
            
        case 'shop':
            // Show the resistance shop
            showShop();
            break;
    }
}

/**
 * Check if a player has won individually by collecting enough books
 */
function checkIndividualWinCondition(player) {
    if (player.books >= gameState.targetBooks) {
        // Player has won individually
        gameState.gameOver = true;
        showGameOverScreen(true, player);
    }
}

/**
 * Show a random trivia question
 */
function showTriviaQuestion() {
    // Select a random trivia question
    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const question = triviaQuestions[randomIndex];
    
    // Populate trivia popup
    triviaQuestion.textContent = question.question;
    triviaOptions.innerHTML = '';
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('trivia-option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => selectTriviaOption(optionElement, index === question.correctIndex, question.explanation));
        
        triviaOptions.appendChild(optionElement);
    });
    
    // Show trivia popup
    triviaPopup.classList.remove('hidden');
    triviaResult.classList.add('hidden');
    triviaContinueBtn.classList.add('hidden');
}

/**
 * Handle trivia option selection
 */
function selectTriviaOption(optionElement, isCorrect, explanation) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Disable all options
    const options = document.querySelectorAll('.trivia-option');
    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Mark selected option
    optionElement.classList.add('selected');
    
    // Mark correct/incorrect
    if (isCorrect) {
        optionElement.classList.add('correct');
        triviaResult.textContent = `Correct! ${explanation}`;
        triviaResult.classList.add('correct');
        triviaResult.classList.remove('incorrect');
        
        // Award knowledge points
        gameState.knowledgePoints += 2;
        currentPlayer.knowledge += 2;
        
        // Apply character bonus if applicable
        if (currentPlayer.character.name === "Clarisse") {
            gameState.knowledgePoints++;
            currentPlayer.knowledge++;
            triviaResult.textContent += ' Clarisse\'s ability activated: +1 bonus Knowledge Point!';
        }
        
        // Check win condition
        checkWinCondition();
    } else {
        optionElement.classList.add('incorrect');
        
        // Find and mark the correct option
        options.forEach((opt, index) => {
            if (parseInt(opt.dataset.index) === question.correctIndex) {
                opt.classList.add('correct');
            }
        });
        
        triviaResult.textContent = `Incorrect. ${explanation}`;
        triviaResult.classList.add('incorrect');
        triviaResult.classList.remove('correct');
        
        // Increase censorship level
        gameState.censorshipLevel++;
        
        // Check lose condition
        checkLoseCondition();
    }
    
    // Show result and continue button
    triviaResult.classList.remove('hidden');
    triviaContinueBtn.classList.remove('hidden');
    
    // Update game UI
    updateGameUI();
}

/**
 * Close trivia popup and continue game
 */
function closeTrivia() {
    triviaPopup.classList.add('hidden');
    // End the turn after answering trivia
    endTurn();
}

/**
 * Show a random event card
 */
function showRandomEvent() {
    // Select a random event
    const randomIndex = Math.floor(Math.random() * events.length);
    const event = events[randomIndex];
    
    // Apply event effect
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    let effectDescription = '';
    
    switch (event.effect.type) {
        case 'knowledge':
            gameState.knowledgePoints += event.effect.value;
            currentPlayer.knowledge += event.effect.value;
            effectDescription = `${event.effect.value > 0 ? '+' : ''}${event.effect.value} Knowledge Points`;
            
            // Check win condition
            checkWinCondition();
            break;
            
        case 'censorship':
            gameState.censorshipLevel += event.effect.value;
            effectDescription = `${event.effect.value > 0 ? '+' : ''}${event.effect.value} Censorship Level`;
            
            // Check lose condition
            checkLoseCondition();
            break;
            
        case 'books':
            currentPlayer.books += event.effect.value;
            effectDescription = `${event.effect.value > 0 ? '+' : ''}${event.effect.value} Books`;
            
            if (event.effect.value > 0) {
                gameState.knowledgePoints += event.effect.value;
                currentPlayer.knowledge += event.effect.value;
                checkWinCondition();
            }
            break;
            
        case 'move':
            // Move player forward or backward
            let newPosition = (currentPlayer.position + event.effect.value) % boardSpaces.length;
            if (newPosition < 0) newPosition += boardSpaces.length;
            currentPlayer.position = newPosition;
            effectDescription = `Move ${event.effect.value > 0 ? 'forward' : 'backward'} ${Math.abs(event.effect.value)} spaces`;
            updatePlayerPositions();
            break;
    }
    
    // Show event popup
    eventDescription.innerHTML = `<p>${event.description}</p><p><strong>Effect:</strong> ${effectDescription}</p>`;
    eventPopup.classList.remove('hidden');
    
    // Update game UI
    updateGameUI();
}

/**
 * Close event popup and continue game
 */
function closeEvent() {
    eventPopup.classList.add('hidden');
    // End the turn after an event
    endTurn();
}

/**
 * End the current player's turn and move to the next player
 */
function endTurn() {
    // Move to the next player
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    
    // Update UI for the new player's turn
    updateGameUI();
}

/**
 * Check if the resistance has won
 */
function checkWinCondition() {
    if (gameState.knowledgePoints >= gameState.knowledgeTarget) {
        // Resistance wins!
        gameState.gameOver = true;
        showGameOverScreen(true);
    }
}

/**
 * Check if the resistance has lost
 */
function checkLoseCondition() {
    if (gameState.censorshipLevel >= gameState.censorshipMax) {
        // Resistance loses!
        gameState.gameOver = true;
        showGameOverScreen(false);
    }
}

/**
 * Show the game over screen
 */
function showGameOverScreen(isVictory, individualWinner = null) {
    if (individualWinner) {
        // Individual win by collecting books
        gameResultTitle.textContent = `${individualWinner.name} Wins!`;
        gameResultMessage.textContent = `${individualWinner.name} has collected ${individualWinner.books} books and become the true guardian of literature! In the tradition of the book people from Fahrenheit 451, they will ensure knowledge survives.`;
    } else if (isVictory) {
        gameResultTitle.textContent = "Resistance Victory!";
        gameResultMessage.textContent = "The resistance has preserved enough knowledge to fight back against censorship. Your efforts will ensure the survival of literature and free thought!";
    } else {
        gameResultTitle.textContent = "Resistance Defeated";
        gameResultMessage.textContent = "The censorship has overwhelmed the resistance. The firemen have destroyed too many books, and knowledge has been lost.";
    }
    
    // Show player scores
    finalScores.innerHTML = '';
    
    // Sort players by books for individual win or by knowledge points for team win
    const sortedPlayers = [...gameState.players].sort((a, b) => {
        if (individualWinner) {
            return b.books - a.books;
        } else {
            return b.knowledge - a.knowledge;
        }
    });
    
    sortedPlayers.forEach((player, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.classList.add('final-score-item');
        
        // Mark winner
        if ((individualWinner && player.name === individualWinner.name) || 
            (!individualWinner && index === 0 && isVictory)) {
            scoreElement.classList.add('winner');
        }
        
        scoreElement.innerHTML = `
            <span>${player.name} (${player.character.name})</span>
            <span>${player.books} Books, ${player.knowledge} Knowledge Points</span>
        `;
        
        finalScores.appendChild(scoreElement);
    });
    
    // Show game over popup
    gameOverPopup.classList.remove('hidden');
}

/**
 * Reset the game to start a new game
 */
function resetGame() {
    // Reset game state
    gameState.players = [];
    gameState.currentPlayerIndex = 0;
    gameState.knowledgePoints = 0;
    gameState.censorshipLevel = 0;
    gameState.gameStarted = false;
    gameState.gameOver = false;
    
    // Hide all game screens
    gameSetup.classList.add('hidden');
    characterSelection.classList.add('hidden');
    gameBoard.classList.add('hidden');
    gameOverPopup.classList.add('hidden');
    
    // Show start game button
    startGameBtn.parentElement.classList.remove('hidden');
    
    // Reset player selection
    const playerCountBtns = document.querySelectorAll('.player-count-btn');
    playerCountBtns.forEach(btn => btn.classList.remove('selected'));
    playerFormsContainer.innerHTML = '';
    confirmPlayersBtn.disabled = true;
}
