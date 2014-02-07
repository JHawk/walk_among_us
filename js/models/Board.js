var models = models || {};

models.Board = function (width, height) {
  var self = this;

  var _width = _(width).range();
  var _height = _(height).range();
  var _centerBlock = [Math.floor(width / 2), Math.floor(height / 2)];
  
  this.grid = new PF.Grid(width, height);

  var _finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  }); 

  this.findPath = function (from, to) {
    to = (self.isEmpty({x: to[0], y: to[1]})) ? to : self.adjacentEmptySpace(to);
    return _finder.findPath(from[0], from[1], to[0], to[1], self.grid.clone());
  };
  
  self.centerPosition = _.map(_centerBlock, function (b) { 
    return (b * meshes.Wall.size); 
  });

  var emptySpaces = [];

  this.emptySpace = function(p) {
    self.updateTargetableWalls();
    self.grid.setWalkableAt(p.x, p.y, true);
    emptySpaces.push([p.x, p.y]);
  };

  this.emptySpaces = function(ps) {
    _.each(ps, self.emptySpace);
  };
  
  this.createWalls = function () {
    var spawnArea = self.spawnArea();
    var walls = self.walls();
    return [].concat(spawnArea).concat(walls);
  };

  var spawnRadius = 3;

  var spawnRange = function(idx) {
    return _.range(_centerBlock[idx] - spawnRadius, _centerBlock[idx] + spawnRadius);
  };

  var spawnX = function () {
    return spawnRange(0);
  };

  var spawnY = function () {
    return spawnRange(1);
  };

  this.randomSpawnPoint = function () {
    return [_.sample(spawnX()), _.sample(spawnY())];
  };

  this.randomEmptyPoint = function () {
    return _.sample(emptySpaces);
  };

  this.spawnArea = function () {
    _.each(spawnX(), function (x) {
      _.each(spawnY(), function (y) {
        self.emptySpace({x: x, y: y});
        new models.Tile(x,y);
      });
    });
    return [];
  };

  this.update = function () {
    _.each(models.Minion.alive, function (sprite) {
      sprite.update();
    });
  };

  var spawn = function (constructor) {
    var spawnPoint = self.randomSpawnPoint();
    var x = spawnPoint[0], y = spawnPoint[1];
    return new constructor(x,y);
  };

  this.spawnExplorer = function () {
    return spawn(models.Explorer);
  };

  this.spawnFighter = function () {
    return spawn(models.Fighter);
  };

  var explorerCount = 1;

  this.createExplorers = function () {
    _.each(_.range(explorerCount), function () {
      self.spawnExplorer();
    });
  };

  this.adjacentBoardPositions = function (p) {
    return [
      [p[0] - 1, p[1]],
      [p[0] + 1, p[1]],
      [p[0], p[1] - 1],
      [p[0], p[1] + 1]
    ];
  };

  // TODO factor out the board concept of objects - let scene deal with it.
  this.isEmpty = function (p) {
    return self.grid.getNodeAt(p.x, p.y).walkable;
  }

  this.isNearEmptySpace = function (p) {
    return self.adjacentEmptySpace(p) != undefined;
  };

  this.adjacentEmptySpace = function (position) {
    return _.find(self.adjacentBoardPositions(position), function (p) {
      return self.isEmpty({x: p[0], y: p[1]});
    });
  };

  this.targetableWalls = [];

  this.updateTargetableWalls = function () {
    self.targetableWalls = _.filter(models.Wall.selected, function (w) {
      return self.isNearEmptySpace(w.boardPosition());
    });
  };

  this.createFocus = function () {
    self.grid.setWalkableAt(_centerBlock[0],_centerBlock[1], false);
    new models.Focus(_centerBlock[0],_centerBlock[1]);    
  };

  this.walls = function () {
    _width.map(function(x) {
      _height.map(function(y) {
        if (self.isEmpty({x:x, y:y})) return;

        var position = [x,y];
        var wall = new models.Wall(x,y);
        self.grid.setWalkableAt(x, y, false);
        wall.onSelected(self.updateTargetableWalls);
        wall.onDeselected(self.updateTargetableWalls);
        wall.onRemoved(function () {
          var p = wall.boardPosition();
          self.emptySpace({x: p[0], y: p[1]});
          self.updateTargetableWalls();
        });
      });
    });
  };

  _width.map(function(x) {
    _height.map(function(y) {
      self.grid.setWalkableAt(x, y, false);
    });
  });

  models.Board.board = self;
};