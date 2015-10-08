var TILE_SIZE = 75;
var TILE_SPACING = 5;
var BOARD_SIZE = (TILE_SIZE + TILE_SPACING) * 3;

var game = new Game("board", BOARD_SIZE, BOARD_SIZE, {create: create});

var tiles;
function create() {
    tiles = new Group();

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            tiles.add(new Tile(x, y));
        }
    }

    game.add(tiles);
}

function Tile(xIndex, yIndex) {
    Entity.call(this,
                new RectangleGraphic(),
                {width: TILE_SIZE, height: TILE_SIZE},
                {x: xIndex * (TILE_SIZE + TILE_SPACING), y: yIndex * (TILE_SIZE + TILE_SPACING)});
}

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile; // Reset the constructor from Entity to Tile

Tile.prototype.onClick = function(position) {
    if (this.overlapPoint(position)) {
        this.graphic.color = "rgb(100, 100, 230)";
    }
}

