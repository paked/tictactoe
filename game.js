var TILE_SIZE = 75;
var TOP_MARGIN = 25;
var TILE_SPACING = 5;
var BOARD_TILES = 3;
var BOARD_SIZE = (TILE_SIZE + TILE_SPACING) * BOARD_TILES;
var MODE_EASY = 0;
var MODE_HARD = 1;
var MODE_MANUAL = 2;
var MODE = MODE_EASY;

var game = new Game("board", BOARD_SIZE, TOP_MARGIN + BOARD_SIZE, {create: create, update: update});

var board;
var text;

function create() {
    board = new Board();

    text = new Entity(new TextGraphic("Tic Tac Toe"), {x: 0, y:0}, {});

    game.add(board);
    game.add(text);
}

function update() {
    if (board.getTurn()) {
        switch(MODE) {
            case MODE_EASY: {
                // move into random posiitno
                var turn;
                while (true) {
                    turn = getMove();

                    if (board.valid(turn) || board.totalTurns == 9) {
                        break;
                    }
                }

                board.makeMove(turn);
            }
            case MODE_HARD: {

            }
        }
    } else {
        // manual move
    }
}

function getMove() {
    return {
        x: getRandomInt(0, BOARD_TILES - 1),
        y: getRandomInt(0, BOARD_TILES - 1)
    }
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
    if (this.overlapPoint(position) && (MODE == MODE_MANUAL || board.getTurn() == 0)) {
        this.graphic.color = board.getPlayer();
        board.makeMove({x: this._xIndex, y: this._yIndex});
    }
}

function Board() {
    Group.call(this);

    this.real = [];

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

Board.prototype.valid = function(move) {
    if (this.real[move.y][move.x] == undefined) {
        return false;
    }

    if (this.real[move.y][move.x] != 3) {
        return false;
    }

    return true;
}

Board.prototype.makeMove = function(move) {
    this.real[move.y][move.x] = this.getTurn();

    var won = this.hasWon(this.getTurn());

    var tile = this._contents[move.y * BOARD_TILES + move.x];
    tile.graphic.color = board.getPlayer();

    this.totalTurns++;

    return won;
}

Board.prototype.getTurn = function() {
    if (this.totalTurns % 2 == 0) {
        return 0;
    }

    return 1;
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

Board.prototype.hasWon = function(player) {
    console.log("Current player %s", player);
    this.toString();
    // horizontal check
    for (var y = 0; y < BOARD_TILES; y++) {
        var x = 0;
        while (x < BOARD_TILES) {
            if (this.real[y][x] != player) {
                break;
            }

            x++;

            if (x == BOARD_TILES) {
                alert("potato!");
                return true;
            }
        }
    }

    // vertical check
    for (var x = 0; x < BOARD_TILES; x++) {
        var y = 0;
        while (y < BOARD_TILES) {
            if (this.real[y][x] != player) {
                break;
            }

            y++;

            if (y == BOARD_TILES) {
                alert("vertical potato!");
                return true;
            }
        }
    }
    
    // right diagonal check
    var i = 0;
    while (i < BOARD_TILES) {
        if (this.real[i][i] != player) {
            break;
        }

        i++;

        if (i == BOARD_TILES) {
            alert("RIGHT-DIAG POTATO");
            return true;
        }
    }
    
    // right vertical check
    i = 0;
    while (i < BOARD_TILES) {
        if (this.real[this.real.length - 1  - i][i] != player) {
            break;
        }

        i++;

        if (i == BOARD_TILES) {
            alert("LEFT-DIAG POTATO");
            return true;
        }
    }

    return false;

}
