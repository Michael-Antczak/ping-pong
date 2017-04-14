// "use strict";

var Game = {
    canvas : undefined,
    canvasContext : undefined,
    recPos : 10
}

Game.start = function() {
    Game.canvas = document.getElementById('myCanvas');
    Game.canvasContext = Game.canvas.getContext('2d');
    Game.mainLoop();
}

document.addEventListener('DOMContentLoaded', Game.start);

Game.update = function() {
    var d = new Date();
    Game.recPos = d.getTime() % Game.canvas.width;
};

Game.draw = function() {
    if (Game.recPos < 400) {
        Game.canvasContext.fillStyle = "pink";
    } else {
        Game.canvasContext.fillStyle = "blue";
    }
    
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

            
