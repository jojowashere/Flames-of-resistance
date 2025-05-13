/**
 * Flames of Resistance: A Fahrenheit 451-inspired board game
 * Shop items and functionality
 */

// Shop items available for purchase
const shopItems = [
    {
        name: "Seashell Radio",
        description: "Small radio earpiece described in the book that Montag uses to communicate with Faber",
        cost: 5,
        effect: "Move to any safe house on the board",
        icon: "fas fa-headphones"
    },
    {
        name: "Mechanical Hound Repellent",
        description: "A device to temporarily disable the mechanical hound",
        cost: 7,
        effect: "Immunity to the next danger space you land on",
        icon: "fas fa-spray-can"
    },
    {
        name: "Hidden Book Cache",
        description: "Information about the location of hidden books",
        cost: 8,
        effect: "Gain 2 books immediately",
        icon: "fas fa-bookmark"
    },
    {
        name: "Faber's Green Bullet",
        description: "The two-way audio transmitter Faber invented",
        cost: 6,
        effect: "Auto-answer the next trivia question correctly",
        icon: "fas fa-microphone"
    },
    {
        name: "Clarisse's Journal",
        description: "Contains insights from the free-thinking young woman",
        cost: 4,
        effect: "Roll the dice twice on your next turn and choose the higher result",
        icon: "fas fa-book-open"
    },
    {
        name: "Fire Captain's Badge",
        description: "A stolen badge that provides temporary authority",
        cost: 10,
        effect: "Reduce censorship level by 3",
        icon: "fas fa-certificate"
    },
    {
        name: "Book People Map",
        description: "A map showing the locations of the book people",
        cost: 7,
        effect: "Choose your path at all intersections for the next 3 turns without rolling",
        icon: "fas fa-map"
    },
    {
        name: "Phoenix Symbol",
        description: "A symbol of rebirth and resistance",
        cost: 5,
        effect: "If you lose a book, immediately get it back",
        icon: "fas fa-fire-alt"
    }
];

/**
 * Display the shop interface
 */
function showShop() {
    // Create shop popup elements if they don't exist
    if (!document.getElementById('shop-popup')) {
        createShopElements();
    }
    
    const shopPopup = document.getElementById('shop-popup');
    const shopItems = document.getElementById('shop-items');
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Clear previous items
    shopItems.innerHTML = '';
    
    // Update player knowledge points display
    document.getElementById('shop-knowledge-points').textContent = currentPlayer.knowledge;
    
    // Populate shop with items
    window.shopItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('shop-item');
        if (currentPlayer.knowledge < item.cost) {
            itemElement.classList.add('unavailable');
        }
        
        itemElement.innerHTML = `
            <div class="item-icon"><i class="${item.icon}"></i></div>
            <div class="item-details">
                <div class="item-name">${item.name} <span class="item-cost">${item.cost} knowledge points</span></div>
                <div class="item-description">${item.description}</div>
                <div class="item-effect">Effect: ${item.effect}</div>
            </div>
        `;
        
        // Add purchase event listener
        itemElement.addEventListener('click', () => {
            if (currentPlayer.knowledge >= item.cost) {
                purchaseItem(index);
            }
        });
        
        shopItems.appendChild(itemElement);
    });
    
    // Show the shop popup
    shopPopup.classList.remove('hidden');
}

/**
 * Create shop UI elements
 */
function createShopElements() {
    const shopPopup = document.createElement('div');
    shopPopup.id = 'shop-popup';
    shopPopup.classList.add('popup', 'hidden');
    
    const shopContent = document.createElement('div');
    shopContent.classList.add('popup-content', 'shop-content');
    
    shopContent.innerHTML = `
        <h2>Resistance Shop</h2>
        <div class="shop-header">
            <p>Your Knowledge Points: <span id="shop-knowledge-points">0</span></p>
            <p class="shop-instruction">Click on an item to purchase</p>
        </div>
        <div id="shop-items" class="shop-items"></div>
        <button id="shop-close-btn" class="action-btn">Close Shop</button>
    `;
    
    shopPopup.appendChild(shopContent);
    document.querySelector('.game-container').appendChild(shopPopup);
    
    // Add close button event listener
    document.getElementById('shop-close-btn').addEventListener('click', closeShop);
}

/**
 * Purchase an item from the shop
 */
function purchaseItem(itemIndex) {
    const item = shopItems[itemIndex];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Check if player has enough knowledge points
    if (currentPlayer.knowledge < item.cost) {
        return;
    }
    
    // Deduct cost
    currentPlayer.knowledge -= item.cost;
    
    // Add item to player's inventory
    if (!currentPlayer.inventory) {
        currentPlayer.inventory = [];
    }
    currentPlayer.inventory.push({...item});
    
    // Show confirmation message
    alert(`You purchased ${item.name}!`);
    
    // Update shop display
    showShop();
}

/**
 * Close the shop interface
 */
function closeShop() {
    const shopPopup = document.getElementById('shop-popup');
    shopPopup.classList.add('hidden');
}

/**
 * Use an item from a player's inventory
 */
function useItem(playerIndex, itemIndex) {
    const player = gameState.players[playerIndex];
    const item = player.inventory[itemIndex];
    
    // Apply item effect
    applyItemEffect(player, item);
    
    // Remove item from inventory
    player.inventory.splice(itemIndex, 1);
    
    // Update UI
    updateGameUI();
}

/**
 * Apply the effect of an item
 */
function applyItemEffect(player, item) {
    switch(item.name) {
        case "Seashell Radio":
            // Find a random safe house
            const safeHouses = boardSpaces.filter(space => space.type === 'safe-house')
                                           .map((space, index) => index);
            if (safeHouses.length > 0) {
                const randomSafeHouse = safeHouses[Math.floor(Math.random() * safeHouses.length)];
                player.position = randomSafeHouse;
                alert(`${player.name} used ${item.name} to teleport to a safe house!`);
            }
            break;
            
        case "Mechanical Hound Repellent":
            player.dangerImmunity = true;
            alert(`${player.name} used ${item.name} and is now immune to the next danger!`);
            break;
            
        case "Hidden Book Cache":
            player.books += 2;
            gameState.knowledgePoints += 2;
            player.knowledge += 2; // Return some knowledge for immediate use
            alert(`${player.name} used ${item.name} and found 2 books!`);
            // Check win condition if books is the goal
            if (gameState.targetBooks && player.books >= gameState.targetBooks) {
                showGameOverScreen(true, player);
            }
            break;
            
        case "Faber's Green Bullet":
            player.autoAnswerTrivia = true;
            alert(`${player.name} used ${item.name} and will automatically answer the next trivia correctly!`);
            break;
            
        case "Clarisse's Journal":
            player.doubleRoll = true;
            alert(`${player.name} used ${item.name} and will roll twice on the next turn!`);
            break;
            
        case "Fire Captain's Badge":
            gameState.censorshipLevel = Math.max(0, gameState.censorshipLevel - 3);
            alert(`${player.name} used ${item.name} and reduced the censorship level by 3!`);
            break;
            
        case "Book People Map":
            player.pathChoiceTurns = 3;
            alert(`${player.name} used ${item.name} and can choose paths freely for 3 turns!`);
            break;
            
        case "Phoenix Symbol":
            player.bookProtection = true;
            alert(`${player.name} used ${item.name} and has protection against losing the next book!`);
            break;
    }
}