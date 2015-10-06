var TILE_SIZE = 75;
var TILE_SPACING = 5;
var game = new Game("board", 500, 500);

function Tile(xIndex, yIndex) {
    Entity.call(this,
                new RectangleGraphic(),
                {width: TILE_SIZE, height: TILE_SIZE},
                {x: xIndex * (TILE_SIZE + TILE_SPACING), y: yIndex * (TILE_SIZE + TILE_SPACING)});
}

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile; // Reset the constructor from Entity to Tile

game.add(new Tile(2, 2));
for (var y = 0; y < 3; y++) {
    for (var x = 0; x < 3; x++) {
        game.add(new Tile(x, y));
    }
}
