var models = models || {};

models.Board = function (width, height) {
  var self = this;
  self = _.extend(this, new style.Colors);

  var _width = _(width).range();
  var _height = _(height).range();
  var _center = [Math.floor(width / 2), Math.floor(height / 2)];
  
  var _board = {};

  this.wall = new meshes.Wall;
  this.minion = new meshes.Minion;

  this.createWalls = function () {
    var spawnArea = self.spawnArea();
    var walls = self.walls();
    return [].concat(spawnArea).concat(walls);
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

  var sprites = [];

  this.createMinion = function () {
    var spawnPoint = randomSpawnPoint();
    var x = spawnPoint[0], y = spawnPoint[1];
    var name = self.name("Minion", x, y);
    var color = self.minionColor();
    var minion = self.minion.create(x, y, color);
    minion.model = new model.Minion(color, minion);
    minion.name = name;

    sprites.push(minion.model);

    return minion;
  };

  this.update = function () {
    _.each(sprites, function (sprite) {
      sprite.update();
    });
  };

  this.name = function (obj, x, y) {
    return obj + "-x:" + x + "-y:" + y;
  };

  var selectedWalls = [];

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

        wall.model.onSelect(function () { 
          selectedWalls.push(wall); 
           
          console.log(_.map(selectedWalls, function(w) {return w.name;}));
        });

        wall.model.onDeselect(function () {
          selectedWalls = _.reject(selectedWalls, function (w) { return w == wall}); 
          console.log(_.map(selectedWalls, function(w) {return w.name;}));
        });

        _board[position] = name;
        return wall;
      });
    });

    return _.flatten(walls);
  };
};