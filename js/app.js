// <<<<<<<<<<<<<<<<<<<<<<<< ENEMY >>>>>>>>>>>>>>>>>>>>>>>>
// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location
    this.x = x;
    this.y = y;

    // Setting the Enemy speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Updates the Enemy location
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;

    // If an enemy reaches the right end
    if (this.x > 500) {
        this.x = -60;
        this.speed = 500 + Math.floor(Math.random() * 300);
    }

    // Handles collision with the Player
    if (player.x < this.x + 70 && player.x > this.x - 70 &&
        player.y < this.y + 70 && player.y > this.y - 70) {
        // Move the player to the initial location
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// <<<<<<<<<<<<<<<<<<<<<<<< PLAYER >>>>>>>>>>>>>>>>>>>>>>>>
// Now write your own player class
// This class requires an update(), render(), and a handleInput() method.
const Player = function(x, y) {
    // Loading the image
    this.sprite = 'images/char-boy.png';

    // Setting the Player initial location
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {

}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Receive user input, allowedKeys (the key which was pressed) 
// and move the player according to that input
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0)
        this.x -= 100;
    if (key === 'up' && this.y > 0)
        this.y -= 80;
    if (key === 'right' && this.x < 360)
        this.x += 100;
    if (key === 'down' && this.y < 380)
        this.y += 80;

    // If player reaches the top(water block), move the player to the bottom
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 200;
            this.y = 380;
        }, 300);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [];
const enemiesLocationY = [63, 145, 228];

enemiesLocationY.forEach(function(y) {
    const enemy = new Enemy(-200, y, 1000);
    allEnemies.push(enemy);
});

const player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
