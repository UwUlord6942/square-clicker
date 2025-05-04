// --- Game Element Selection ---
// Get the square element that players will click
const square = document.querySelector('.square');
const clickMultiplierButton = document.querySelector('#buyClickMultiplier'); // Get the button used to purchase click multipliers
const clickMultiplierDisplay = document.getElementById('clickMultiplierDisplay'); // Get the display that shows current click multiplier

// Get the display that shows current points
const pointsDisplay = document.getElementById('pointsDisplay');

// Get the button used to purchase auto-clickers
const buyButton = document.querySelector('#buyAutoClicker');

// Get the display that shows how many auto-clickers owned
const autoClickerDisplay = document.getElementById('autoClickerCount');

// --- Game State Variables ---
// Points are the game's currency - start with zero
let point = 0;
let clickPower = 1;  // How many points each click gives
let clickMultiplierCost = 50;  // Starting cost for click multiplier


// Track how many auto-clickers the player owns
let autoClickerCount = 0;

// Cost of buying a new auto-clicker - increases with each purchase
let autoClickerCost = 10;

// Store the interval ID for auto-clicking system
let autoClickerInterval = null;

// --- Manual Clicking System ---
// Handle player clicks on the square
square.addEventListener('click', function() {
    // Add one point per click
    point = point + clickPower;
    // Update the display with new point total
    pointsDisplay.textContent = 'Points: ' + point;
    // Log click for debugging
    console.log('Clicked! Points:', point);
});
clickMultiplierButton.addEventListener('click', function() {
    if (point >= clickMultiplierCost) {
        // Purchase successful
            point = point - clickMultiplierCost;  // Deduct points for purchase
            clickPower = clickPower * 2;  // Double the click power
        clickMultiplierCost = Math.floor(clickMultiplierCost * 2.5);  // Increase cost more than autoclickers
         // Update displays
         pointsDisplay.textContent = 'Points: ' + point;
         clickMultiplierDisplay.textContent = 'Click Power: ' + clickPower;
         clickMultiplierButton.textContent = 'Buy Click Multiplier (Cost: ' + clickMultiplierCost + ' points)';
         
         console.log('Bought click multiplier! New power:', clickPower);
     } else {
         console.log('Not enough points! Need:', clickMultiplierCost);
        }
});
    

// --- Auto-Clicker Visual System ---
// Creates and animates a cursor for each auto-clicker
function createCursor() {
    // Create a new cursor element
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    // Function to move cursor to random position
    function animateCursor() {
        // Get square's position and size
        const rect = square.getBoundingClientRect();
        // Add some padding around the square
        const padding = 20;
        
        // Calculate random position near the square
        const x = rect.x - padding + Math.random() * (rect.width + padding * 2);
        const y = rect.y - padding + Math.random() * (rect.height + padding * 2);
        
        // Move cursor to new position
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    }

    // Move cursor every second
    setInterval(animateCursor, 1000);
    // Set initial position
    animateCursor();
}

// --- Auto-Clicker System ---
// Manages the automatic point generation
function startAutoClicker() {
    // Only start if no interval is running
    if (!autoClickerInterval) {
        // Create interval that runs every second
        autoClickerInterval = setInterval(function() {
            // Add points based on number of auto-clickers
            point = point + autoClickerCount;
            // Update display with new total
            pointsDisplay.textContent = 'Points: ' + point;
            // Log auto-clicks for debugging
            

            console.log('Auto-click! Points:', point);
        }, 1000);
    }
}


// --- Store System ---
// Handle auto-clicker purchases
buyButton.addEventListener('click', function() {
    // Check if player can afford purchase
    if (point >= autoClickerCost) {
        // Subtract cost from points
        point = point - autoClickerCost;
        // Add new auto-clicker
        autoClickerCount++;
        // Create visual cursor for new auto-clicker
        createCursor();
        // Increase cost for next purchase
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        // Update all displays
        pointsDisplay.textContent = 'Points: ' + point;
        autoClickerDisplay.textContent = 'Auto Clickers: ' + autoClickerCount;
        buyButton.textContent = 'Buy Auto-Clicker (Cost: ' + autoClickerCost + ' points)';
        // Start auto-clicking if not already running
        startAutoClicker();
        // Log purchase for debugging
        console.log('Bought auto-clicker! Total:', autoClickerCount, 'Next cost:', autoClickerCost);
    } else {
        // Inform player they need more points
        console.log('Not enough points! You need:', autoClickerCost, 'points');
    }
});

// --- Initial Setup ---
// Set starting text for displays
buyButton.textContent = 'Buy Auto-Clicker (Cost: ' + autoClickerCost + ' points)';
autoClickerDisplay.textContent = 'Auto Clickers: ' + autoClickerCount;