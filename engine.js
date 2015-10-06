var _entities = [];
var _context;
var ctx;

function Game(canvasID, width, height, fps) {
    var self = this;

    var canvas = document.getElementById(canvasID);
    ctx = canvas.getContext("2d");
    ctx.canvas.width = width || 500;
    ctx.canvas.height = height || 500;

    fps = fps || 30;

    setInterval(function() {
        self.update();
        self.draw();
    }, 1000/fps);
}

Game.prototype.update = function() {
    _entities.forEach(function(entity) {
        entity.update();
    });
}

Game.prototype.draw = function() {
    ctx.clearRect(0, 0, 500, 500);
    _entities.forEach(function(entity) {
        entity.draw();
    });
}

Game.prototype.add = function(object) {
    _entities.push(object);
}

function Entity() {
    this.color = "#DDD";
    this.x = 40;
    this.y = 40;
}

Entity.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 100, 100);
}

Entity.prototype.update = function() {
    this.x += 1;
    this.y += 1;
}

