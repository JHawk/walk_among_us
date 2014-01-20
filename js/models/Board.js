var models = models || {};

models.Board = function (width, height) {
  var self = this;
  self = _.extend(this, new style.Colors);

  var _width = _(width).range();
  var _height = _(height).range();
  this.wall = new meshes.Wall;

  this.create = function () {
    var blocks = _width.map(function(x) {
      return _height.map(function(y) {
        var color = self.blockColor();
        var wall = self.wall.create(x,y,color);
        wall.model = new model.Wall(color);
        return wall;
      });
    });

    return _.flatten(blocks);
  };
};