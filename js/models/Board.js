var models = models || {};

models.Board = function (width, height) {
  var self = this;

  var _width = _(width).range();
  var _height = _(height).range();
  var _centerBlock = [Math.floor(width / 2), Math.floor(height / 2)];
  var _grid = new PF.Grid(width, height);

  var _finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  }); 

  this.findPath = function (from, to) {
    to = (self.isEmpty(to)) ? to : self.adjacentEmptySpace(to);
    var path = _finder.findPath(from[0], from[1], to[0], to[1], _grid.clone());
    return PF.Util.smoothenPath(_grid.clone(), path);
  };
  
  var _board = {};
  
  self.centerPosition = _.map(_centerBlock, function (b) { 
    return (b * meshes.Wall.size) - meshes.Wall.size / 2 
  });
  
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

  var randomSpawnPoint = function () {
    return [_.sample(spawnX()), _.sample(spawnY())];
  };

  this.spawnArea = function () {
    _.each(spawnX(), function (x) {
      _.each(spawnY(), function (y) {
        var position = [x,y];
        if (_board[position]) return;
        _board[position] = "Empty";
        _grid.setWalkableAt(x, y, true);
      });
    });
    return [];
  };

  this.update = function () {
    _.each(models.Minion.alive, function (sprite) {
      sprite.update();
    });
  };

  this.spawnMinion = function () {
    var spawnPoint = randomSpawnPoint();
    var x = spawnPoint[0], y = spawnPoint[1];
    new models.Minion(x,y);
  };

  var minionCount = 1;

  this.createMinions = function () {
    _.each(_.range(minionCount), function () {
      self.spawnMinion();
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
    return _board[p] === "Empty";
  }

  this.isNearEmptySpace = function (p) {
    return self.adjacentEmptySpace(p) != undefined;
  };

  this.adjacentEmptySpace = function (position) {
    return _.find(self.adjacentBoardPositions(position), function (p) {
      return self.isEmpty(p);
    });
  };

  this.targetableWalls = [];

  this.updateTargetableWalls = function () {
    self.targetableWalls = _.filter(models.Wall.selected, function (w) {
      return self.isNearEmptySpace(w.boardPosition);
    });
  };

  this.walls = function () {
    _width.map(function(x) {
      _height.map(function(y) {
        var position = [x,y];
        if (_board[position] /*|| Math.floor(Math.random() * 10000) % 3 == 0*/) {
          _board[[x,y]] = "Empty";
          // self.updateTargetableWalls();
          _grid.setWalkableAt(x, y, true);
        } else {
          var wall = new models.Wall(x,y);

          _board[position] = [ wall.name, wall.uuid ];

          _grid.setWalkableAt(x, y, false);

          wall.onSelected(self.updateTargetableWalls);
          wall.onDeselected(self.updateTargetableWalls);
          wall.onRemoved(function () {
            _board[wall.boardPosition] = "Empty";
            self.updateTargetableWalls();
            _grid.setWalkableAt(x, y, true);
          });
        }
      });
    });
  };

  models.Board.board = self;
};