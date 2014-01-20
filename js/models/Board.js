var models = models || {};

models.Board = function (width, height) {
  var self = this;
  self = _.extend(this, new style.Colors);

  var _width = _(width).range();
  var _height = _(height).range();
  var _center = [Math.floor(width / 2), Math.floor(height / 2)];
  
  var _board = {};

  this.wall = new meshes.Wall;

  this.create = function () {
    var spawnPoint = self.spawnPoint();
    var walls = self.walls();
    return [].concat(spawnPoint).concat(walls);
  };

  var spawnRadius = 3;

  var spawnRange = function(idx) {
    return _.range(_center[idx] - spawnRadius, _center[idx] + spawnRadius);
  };

  var spawnX = function () {
    return spawnRange(0);
  };

  var spawnY = function () {
    return spawnRange(1);
  };

  this.spawnPoint = function () {
    _.each(spawnX(), function (x) {
      _.each(spawnY(), function (y) {
        var position = [x,y];
        if (_board[position]) return;
        _board[position] = "Empty";
      });
    });
    return [];
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
        wall.model = new model.Wall(color);
        wall.name = name;

        _board[position] = name;
        return wall;
      });
    });

    return _.flatten(walls);
  };
};