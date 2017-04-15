// "use strict";

var Game = {
    canvas : undefined,
    canvasContext : undefined,
    recPos : 10,
    direction : "right"
}

Game.start = function() {
    Game.canvas = document.getElementById('myCanvas');
    Game.canvasContext = Game.canvas.getContext('2d');
    Game.mainLoop();
}

document.addEventListener('DOMContentLoaded', Game.start);

Game.update = function() {
    if (Game.recPos == 1150 && Game.direction == "right") {
        Game.direction = "left";
        
    } else if (Game.recPos == 0 && Game.direction == "left") {
        Game.direction = "right";
    }

    if (Game.direction == "right") {
        Game.recPos += 10;
    } else if (Game.direction == "left") {
        Game.recPos -= 10;
    }
};

Game.draw = function() {
    Game.canvasContext.fillStyle = "blue";
    Game.canvasContext.fillRect(Game.recPos, 0, 50, 50);
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

            
