var models = models || {};

models.Board = function (width, height) {
  var self = this;

  var _width = _(width).range();
  var _height = _(height).range();
  var _centerBlock = [Math.floor(width / 2), Math.floor(height / 2)];
  var _board = {};
  
  self.centerPosition = _.map(_centerBlock, function (b) { return (b * meshes.Wall.size) - meshes.Wall.size / 2 });
  
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

  this.walls = function () {
    _width.map(function(x) {
      _height.map(function(y) {
        var position = [x,y];
        if (_board[position]) return;
        var wall = new models.Wall(x,y);

        _board[position] = wall.name;
      });
    });
  };
};