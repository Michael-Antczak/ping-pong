"use strict";

/******************************************************************  
    Define objects used in the game
******************************************************************/
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
    }, 
    size : {
        x : 50,
        y : 200
    }

}

// object that handles user keyboard input
var Keyboard = {
    keyDown : -1,
}

/******************************************************************  
    Start the Game
******************************************************************/
Game.start = function() {
    Game.canvas = document.getElementById('myCanvas');
    Game.canvasContext = Game.canvas.getContext('2d');
    
    // events to handle user keyboard input
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

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

/******************************************************************  
    Loading the game
******************************************************************/
document.addEventListener('DOMContentLoaded', Game.start);



/******************************************************************  
    Update the game world
******************************************************************/
Game.update = function() {

    // BALL
    // check if the Ball has reached the right edge of the canvas, if yes then reverse
    if (Ball.position.x >= 1150 && Ball.direction.x == "right") {
        Ball.direction.x = "left";
        
    // check if the Ball has reached the right edge of the canvas, if yes then reverse
    if (Ball.position.x <= 0 && Ball.direction.x == "left") {
        Ball.direction.x = "right";
    }

    // check if the Ball has reached the bottom edge of the canvas, if yes then reverse
    if (Ball.position.y >= 550 && Ball.direction.y == "down") {
        Ball.direction.y = "up";

    // check if the Ball has reached the top edge of the canvas, if yes then reverse
    if (Ball.position.y <= 0 && Ball.direction.y == "up") {
        Ball.direction.y = "down";
    }

    // change the block's position in the desired X direction
    if (Ball.direction.x == "right") {
        Ball.position.x += 10;

    if (Ball.direction.x == "left") {
        Ball.position.x -= 10;
    } 
        
    // change the block's position in the desired Y direction
    if (Ball.direction.y == "down") {
        Ball.position.y += 5;
    
    if (Ball.direction.y == "up") {
        Ball.position.y -= 5;
    }

    // RAQUET

    // handle arrow down
    if (Keyboard.keyDown == 40 && ((Raquet.position.y + Raquet.size) < 600 )) {
        Raquet.position.y += 5;

    // handle arrow up
    if (Keyboard.keyDown == 38 && (Raquet.position.y > 0 )) {
        Raquet.position.y -= 5;
    } 
};

/******************************************************************  
    Main drawing function
******************************************************************/
Game.draw = function() {
    // draw the Ball
    Game.canvasContext.fillStyle = "blue";
    Game.canvasContext.fillRect(Ball.position.x, Ball.position.y, 50, 50);

    // draw the Raquet
    Game.canvasContext.fillStyle = "blue";
    Game.canvasContext.fillRect(Raquet.position.x, Raquet.position.y, 50, Raquet.size);
};

/******************************************************************  
    Main loop
******************************************************************/
Game.mainLoop = function() {
    Game.clearCanvas();
    Game.update();
    Game.draw();
    window.setTimeout(Game.mainLoop, 1000 / 60);
};

/******************************************************************  
    Utility functions
******************************************************************/
Game.clearCanvas = function() {
    Game.canvasContext.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

// attached in Game.start
function handleKeyDown(evt) {
    console.log("EVT : ", evt.keyCode);
    Keyboard.keyDown = evt.keyCode;
}

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
}



            
