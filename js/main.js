// "use strict";

var Game = {
    canvas : undefined,
    canvasContext : undefined,
}

// Ball object 
var Ball = {
    position : {
        x : 575,
        y : 0,
    },
    direction : {
        x : undefined,
        y : "down",
    }
}

// The user's raquet
var Raquet = {
    position : {
        x : 50, 
        y : 50,
    },
    direction : {
        x : undefined,
        y : undefined,
    }

}

Game.start = function() {
    Game.canvas = document.getElementById('myCanvas');
    Game.canvasContext = Game.canvas.getContext('2d');
    
    // we want to randomize the initial direction of the ball
    // get random odd/even number and the set the direction variable

    var dir = Math.floor( Math.random() * 100 );

    if (dir % 2 == 0) {
        Ball.direction.x = "right";
    } else {
        Ball.direction.x = "left";
    }

    // Initialise the main loop for the game
    Game.mainLoop();
}

// Loading the game 
document.addEventListener('DOMContentLoaded', Game.start);

// Update the game world
Game.update = function() {

    // BALL
    // check if the Ball has reached the left or right edge of the canvas, if yes then reverse
    if (Ball.position.x >= 1150 && Ball.direction.x == "right") {
        Ball.direction.x = "left";
        
    } else if (Ball.position.x <= 0 && Ball.direction.x == "left") {
        Ball.direction.x = "right";
    }

    // check if the Ball has reached the top or bottom edge of the canvas, if yes then reverse
    if (Ball.position.y >= 550 && Ball.direction.y == "down") {
        Ball.direction.y = "up";
        
    } else if (Ball.position.y <= 0 && Ball.direction.y == "up") {
        Ball.direction.y = "down";
    }

    // change the block's position in the desired X direction
    if (Ball.direction.x == "right") {
        Ball.position.x += 10;
    } else if (Ball.direction.x == "left") {
        Ball.position.x -= 10;
    } 
        
    // change the block's position in the desired Y direction
    if (Ball.direction.y == "down") {
        Ball.position.y += 5;
    } else if (Ball.direction.y == "up") {
        Ball.position.y -= 5;
    }
};

// The main drawing function
Game.draw = function() {
    // draw the Ball
    Game.canvasContext.fillStyle = "blue";
    Game.canvasContext.fillRect(Ball.position.x, Ball.position.y, 50, 50);

    // draw the Raquet
    Game.canvasContext.fillStyle = "blue";
    Game.canvasContext.fillRect(Raquet.position.x, Raquet.position.y, 50, 200);
};

Game.mainLoop = function() {
    Game.clearCanvas();
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

Game.clearCanvas = function() {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

            
