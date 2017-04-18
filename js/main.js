"use strict";

/******************************************************************  
    Define objects used in the game
******************************************************************/

    var Game = {
        canvas : undefined,
        ctx : undefined,
        width : 1200, 
        height : 600,
        lives : {
            avail : 3,
            updated: false,
        },
        hits : 0,
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
        }, 
        size : {
            x : 50, 
            y : 50,
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
    Game.ctx = Game.canvas.getContext('2d');
    
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

    // set to false
    Game.lives.updated = false;

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
    }

    // Check for the collison between the Ball and the Raquet first 
    // this is the case when the Ball is wholly contained withing the Raquet
    if (Ball.position.x <= 100 && Ball.position.x >= 90 && Ball.direction.x == "left" && (Raquet.position.y <= Ball.position.y) && 
        ((Raquet.position.y + Raquet.size.y) >= (Ball.position.y + Ball.size.y) )      )  {
        Ball.direction.x = "right";   
        Game.hits++; 
    } 

    // Check for the collison between the Ball and the Raquet  
    // this is the case when the Ball is PARTIALLY contained withing the Raquet
    // on the UPPER right corner of the Raquet
    if ( (Ball.position.x <= 100) && 
            (Ball.position.x >= 90) && 
            (Ball.direction.x == "left") && 
            (Ball.direction.y == "down") &&
            (Raquet.position.y >= Ball.position.y) && 
            (Raquet.position.y <= (Ball.position.y + Ball.size.y) )  )  {

                Ball.direction.x = "right";    
                Ball.direction.y = "up";
                Game.hits++;
        }

    // Check for the collison between the Ball and the Raquet  
    // this is the case when the Ball is PARTIALLY contained withing the Raquet
    // on the LOWER right corner of the Raquet
    if ( (Ball.position.x <= 100) && 
            (Ball.position.x >= 90) && 
            (Ball.direction.x == "left") && 
            (Ball.direction.y == "up") &&
            ( (Raquet.position.y + Raquet.size.y) >= Ball.position.y) && 
            ( (Raquet.position.y + Raquet.size.y) <= (Ball.position.y + Ball.size.y) )  )  {

                Ball.direction.x = "right";    
                Ball.direction.y = "down";
                Game.hits++;
        }


    // check if the Ball has reached the left edge of the canvas, 
    // if yes then GAME OVER
    if (Ball.position.x <= 0 && Ball.direction.x == "left") {

        if (Game.lives <= 0 && Game.lives.updated == false) {
            alert("GAME OVER");
            document.location.reload();
        } else if (Game.lives.updated == false) {
            Game.lives.avail--;
            Game.lives.updated = true;
            
            // Ball object 
            Ball.position.x = 575; 
            Ball.position.y = 0;

            Ball.direction.x = "right";
            Ball.direction.y = "down";

            // The user's raquet
            Raquet.position.x = 50;
            Raquet.position.y = 50; 

            Raquet.direction.x = undefined;
            Raquet.direction.y = undefined;
                    

                }
        }
        
    

    // check if the Ball has reached the bottom edge of the canvas, if yes then reverse
    if (Ball.position.y >= 550 && Ball.direction.y == "down") {
        Ball.direction.y = "up";
    }
    // check if the Ball has reached the top edge of the canvas, if yes then reverse
    if (Ball.position.y <= 0 && Ball.direction.y == "up") {
        Ball.direction.y = "down";
    }

    // change the block's position in the desired X direction
    if (Ball.direction.x == "right") {
        Ball.position.x += 10;
    }
    if (Ball.direction.x == "left") {
        Ball.position.x -= 10;
    } 
        
    // change the block's position in the desired Y direction
    if (Ball.direction.y == "down") {
        Ball.position.y += 5;
    }
    if (Ball.direction.y == "up") {
        Ball.position.y -= 5;
    }

    // RAQUET

    // handle arrow down
    if (Keyboard.keyDown == 40 && ((Raquet.position.y + Raquet.size.y) < 600 )) {
        Raquet.position.y += 5;
    }
    // handle arrow up
    if (Keyboard.keyDown == 38 && (Raquet.position.y > 0 )) {
        Raquet.position.y -= 5;
    } 
};

/******************************************************************  
    Main drawing function
******************************************************************/
Game.draw = function() {

    // draw background
    Game.ctx.fillStyle = "black";
    Game.ctx.fillRect(0, 0, Game.width, Game.height);
    // draw the Ball
    Game.ctx.fillStyle = "white";
    Game.ctx.fillRect(Ball.position.x, Ball.position.y, 50, 50);

    // draw the Raquet
    Game.ctx.fillStyle = "white";
    Game.ctx.fillRect(Raquet.position.x, Raquet.position.y, Raquet.size.x, Raquet.size.y);

    // Draw the hits and lives
    hitsMade();
    livesLeft();
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
    Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
};

// attached in Game.start
function handleKeyDown(evt) {
    console.log("EVT : ", evt.keyCode);
    Keyboard.keyDown = evt.keyCode;
};

function handleKeyUp(evt) {
    Keyboard.keyDown = -1;
};

// This function draws the number of hits 
// recorded during the game by the user
function hitsMade() {
    Game.ctx.font = "36px Arial";
    Game.ctx.fillStyle = "white";
    Game.ctx.fillText("Hits: " + Game.hits, 700, 60);
}

// This function draws the numbers of lives left
function livesLeft() {
    Game.ctx.font = "36px Arial";
    Game.ctx.fillStyle = "white";
    Game.ctx.fillText("Lives: " + Game.lives.avail, 900, 60);
}