function Game(canvasID, width, height, functions, fps) {
    Group.call(this);
    var self = this;

    var canvas = document.getElementById(canvasID);

    this.ctx = canvas.getContext("2d");
    this.ctx.canvas.width = width || 500;
    this.ctx.canvas.height = height || 500;

    canvas.addEventListener("mousedown", this.set(self, this._click), false);

    this.xOffset = canvas.offsetLeft;
    this.yOffset = canvas.offsetTop;

    fps = fps || 30;

    document.addEventListener("DOMContentLoaded", function(event) {
        functions.create();

        setInterval(function() {
            self.update();
            self.ctx.fillStyle = "rgb(255, 250, 250)";
            self.ctx.fillRect(0, 0, width, height);
            self.draw(self.ctx);
        });
    }, 1000/fps);
}

Game.prototype = Object.create(Group.prototype);
Game.prototype.contstructor = Game;

Game.prototype.set = function(self, func) {
    return function(event) {
        func.call(self, event);
    };
}

Game.prototype._click = function(event) {
    for (var i = 0; i < this._contents.length; i++) {
        var entity = this._contents[i];

        if (typeof entity.onClick == 'function') {
            entity.onClick({x: event.x - this.xOffset, y: event.y - this.yOffset});
        }
    }
}

function Entity(graphic, position, size) {
    this.position = position || {x: 100, y: 100};
    this.size = size || {width: 50, height: 50};
    this.graphic = graphic || new RectangleGraphic();

    this.graphic.position = this.position;
    this.graphic.size = this.size;
}

Entity.prototype.draw = function(ctx) {
    this.graphic.draw(ctx);
}

Entity.prototype.overlapPoint = function(point) {
    if (point.x > this.position.x && point.x < this.position.x + this.size.width &&
        point.y > this.position.y && point.y < this.position.y + this.size.height) {
        return true;
    }

    return false;
}

Entity.prototype.update = function() {}

function RectangleGraphic(color) {
    this.color = color || "#DDD";
    this.position;
    this.size;
}

RectangleGraphic.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
}

function TextGraphic(text, color, font) {
    console.log("text graphic");
    this.text = text || "";
    this.color = color || 'rgb(20, 200, 30)';
    this.font = font || '14px Helvetica';
    this.position;
    this.size;
}

TextGraphic.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.fillText(this.text, this.position.x + ctx.canvas.offsetLeft, this.position.y + ctx.canvas.offsetTop);
}

function Group() {
    this._contents = [];
}

Group.prototype.add = function(entity) {
    this._contents.push(entity);
}

Group.prototype.draw = function(ctx) {
    this._contents.forEach(function(entity) {
        entity.draw(ctx);
    });
}

Group.prototype.update = function(ctx) {
    this._contents.forEach(function(entity) {
        entity.update();
    });
}

Group.prototype.onClick = function(point) {
    this._contents.forEach(function(entity) {
        if (typeof entity.onClick == 'function') {
            entity.onClick(point);
        }
    });
}

