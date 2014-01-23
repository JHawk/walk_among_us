var models = models || {};

models.Board = function (width, height) {
  var self = this;
  self = _.extend(this, new style.Colors);

  var _width = _(width).range();
  var _height = _(height).range();
  var _centerBlock = [Math.floor(width / 2), Math.floor(height / 2)];
  var _board = {};
  
  self.centerPosition = _.map(_centerBlock, function (b) { return b * meshes.Wall.size });
  
  this.wall = new meshes.Wall;
  this.minion = new meshes.Minion;

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

  var minions = [];

  this.createMinion = function () {
    var spawnPoint = randomSpawnPoint();
    var x = spawnPoint[0], y = spawnPoint[1];
    var name = self.name("Minion", x, y);
    var color = self.minionColor();
    var minion = self.minion.create(x, y, color);
    minion.model = new model.Minion(color, minion);
    minion.name = name;

    minions.push(minion.model);

    return minion;
  };

  this.update = function () {
    _.each(minions, function (sprite) {
      sprite.update();
    });
  };

  this.name = function (obj, x, y) {
    return obj + "-x:" + x + "-y:" + y;
  };

  this.walls = function () {
    var walls = _width.map(function(x) {
      return _height.map(function(y) {
        var position = [x,y];
        if (_board[position]) return;

        var name = self.name("Wall", x, y);
        var color = self.blockColor();
        var wall = self.wall.create(x,y,color);
        wall.model = new model.Wall(color, wall);
        wall.name = name;
        
        _board[position] = name;
        return wall;
      });
    });

    return _.flatten(walls);
  };
};