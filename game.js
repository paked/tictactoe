var TILE_SIZE = 75;
var TOP_MARGIN = 25;
var TILE_SPACING = 5;
var BOARD_TILES = 3;
var BOARD_SIZE = (TILE_SIZE + TILE_SPACING) * BOARD_TILES;

var game = new Game("board", BOARD_SIZE, TOP_MARGIN + BOARD_SIZE, {create: create});

var board;
var text;

function create() {
    board = new Board();

    text = new Entity(new TextGraphic("Tic Tac Toe"), {x: 0, y:0}, {});

    game.add(board);
    game.add(text);
}

function Tile(xIndex, yIndex) {
    Entity.call(this,
                new RectangleGraphic(),
                {x: xIndex * (TILE_SIZE + TILE_SPACING), y: TOP_MARGIN + yIndex * (TILE_SIZE + TILE_SPACING)},
                {width: TILE_SIZE, height: TILE_SIZE});

    this._xIndex = xIndex;
    this._yIndex = yIndex;
}

Tile.prototype = Object.create(Entity.prototype);
Tile.prototype.constructor = Tile; // Reset the constructor from Entity to Tile

Tile.prototype.onClick = function(position) {
    if (this.overlapPoint(position)) {
        this.graphic.color = board.getPlayer();
        board.makeMove({x: this._xIndex, y: this._yIndex});
    }
}

function Board() {
    Group.call(this);

    this.real = []

    for (var y = 0; y < BOARD_TILES; y++) {
        var row = [];
        for (var x = 0; x < BOARD_TILES; x++) {
            this.add(new Tile(x, y));

            row.push(3);
        }

        this.real.push(row);
    }

    this.totalTurns = 0;
    this.playerCount = 2;
}

Board.prototype = Object.create(Group.prototype);
Board.prototype.contstructor = Game;

Board.prototype.makeMove = function(move) {
    this.real[move.y][move.x] = this.getTurn();

    this.totalTurns++;
}

Board.prototype.getTurn = function() {
    return this.totalTurns % this.playerCount;
}

Board.prototype.getPlayer = function() {
    if (this.getTurn() == 0) {
        return "rgb(100, 100, 230)"
    }

    return "orange";
}

Board.prototype.toString = function() {
    output = "";
    for (var y = 0; y < BOARD_TILES; y++) {
        output += this.real[y].map(function(v) {
            if (v == 3) {
                return " ";
            }

            if (v == 0) {
                return "x";
            }
            
            return "o";
        }).join(" ");
        output += "\n";
    }

    console.log(output);
}
