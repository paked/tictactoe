var _entities = [];
var _context;

function Game(canvasID, width, height, fps) {
    var self = this;

    var canvas = document.getElementById(canvasID);
    this.ctx = canvas.getContext("2d");
    this.ctx.canvas.width = width || 500;
    this.ctx.canvas.height = height || 500;

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
    var self = this;

    this.ctx.clearRect(0, 0, 500, 500);
    _entities.forEach(function(entity) {
        entity.draw(self.ctx);
    });
}

Game.prototype.add = function(object) {
    console.log(object);
    _entities.push(object);
}

function Entity(graphic, size, position) {
    this.position = position || {x: 100, y: 100};
    this.size = size || {width: 50, height: 50};
    this.graphic = graphic || new RectangleGraphic();

    this.graphic.position = this.position;
    this.graphic.size = this.size;
}

Entity.prototype.draw = function(ctx) {
    this.graphic.draw(ctx);
}

Entity.prototype.update = function() {}

function RectangleGraphic(color, width, height) {
    this.color = color || "#DDD";
    this.height = height || 50;
    this.position;
    this.size;
}

RectangleGraphic.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
}
