var TILE_SIZE = 75;
var TOP_MARGIN = 25;
var TILE_SPACING = 5;
var BOARD_SIZE = (TILE_SIZE + TILE_SPACING) * 3;

var game = new Game("board", BOARD_SIZE, TOP_MARGIN + BOARD_SIZE, {create: create});

var tiles;
var text;
function create() {
    tiles = new Group();

    for (var y = 0; y < 3; y++) {
        for (var x = 0; x < 3; x++) {
            tiles.add(new Tile(x, y));
        }
    }

    game.add(tiles);

    text = new Entity(new TextGraphic("Tic Tac Toe"), {x: 10, y:10}, {});

    game.add(text);
}

function Tile(xIndex, yIndex) {
    Entity.call(this,
                new RectangleGraphic(),
                {x: xIndex * (TILE_SIZE + TILE_SPACING), y: TOP_MARGIN + yIndex * (TILE_SIZE + TILE_SPACING)},
                {width: TILE_SIZE, height: TILE_SIZE});
}

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile; // Reset the constructor from Entity to Tile

Tile.prototype.onClick = function(position) {
    if (this.overlapPoint(position)) {
        this.graphic.color = "rgb(100, 100, 230)";
    }
}
