var minSpeed = 100;
var standardSpeed = 222;
var maxSpeed = 510;
// Enemies our player must avoid

var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = Math.round(this.x+(this.speed * dt));
    
    if (this.x > maxSpeed){
        this.x = -50;
        this.speed = minSpeed + Math.floor(Math.random() * standardSpeed);
    }
    
    if (player.x < this.x + 80 && 
        player.x + 80 > this.x && 
        player.y < this.y + 60 && 
        player.y + 60 > this.y){
            player.x=202;
            player.y=405;
            if (player.life > 0){
                player.life--;
            }
            else if (player.life==0) {
                gameOver();
            } 
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function (x,y) {
    this.x=x;
    this.y=y;
    this.player= 'images/char-pink-girl.png'
    this.life = 3;
    this.score = 0;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player.prototype.update = function(dt) {
  
};

player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

player.prototype.renderText = function () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 510, 50);
    ctx.font = "48px serif";
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText("Score: " + this.score, 0, 40, 150);
    ctx.strokeText("Score: " + this.score, 0, 40, 150);
    ctx.fillText("life: " + this.life, 350, 40);
    ctx.strokeText("life: " + this.life, 350, 40);
  };

player.prototype.handleInput = function (keyPress){
    if(keyPress == "left" && this.x >0){
        this.x -= 102;
    }
    if(keyPress == "right" && this.x <405){
        this.x += 102;
    }
    if(keyPress == "up" && this.y > 0){
        this.y -= 83;
    }
    if(keyPress == "down" && this.y < 405){
        this.y += 83;
    }
    if (this.y < 0){
        setTimeout(function (){
            player.x = 202;
            player.y = 405;
            player.score++;
        },600);
    }
}

var allEnemies = [];
var enemylocation = [63 , 147 , 230];

enemylocation.forEach(function (locationY){
    enemy = new Enemy (0 , locationY , 200);
    allEnemies.push(enemy);
});
 
var player = new player(202 , 405);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function gameOver(){
    const loser = document.getElementById("loser");
    const endText = document.querySelector("#endText");
    loser.style.display ="block";
    endText.innerHTML = `Sorry Game Over you can play again`;
}
const playAgain = document.getElementById("playAgain").addEventListener("click" ,  function(){
    loser.style.display = "none";
    restart();
});
function restart(){
    player.x = 202;
    player.y = 400;
    player.life=3;
    player.score=0;
    
}