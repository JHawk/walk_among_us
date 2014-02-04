var models = models || {};

models.Fighter = function (x,y) {
  var self = this;
  self.name = "Fighter";

  self = _.extend(this, new style.Colors());

  self.color = self.fighterColor();
  self.mesh = new meshes.Fighter().create(x,y,self.color);

  self.hitPoints = 20;
  self.tickSpeedMs = 10;
  self.attackSpeedMs = 500;

  // 1 to 1000
  self.speed = 5;
  self.damage = 1;
  self.delay = 200;

  self.meleeRange = 25.0;

  self = _.extend(this, new models.Minion(this));

  self.acquireTarget = function () {
    var walls = models.Board.board.targetableWalls;
    if (walls.length > 0)
    {
      self.target = _.sample(walls);
    }
  }

  return self;
};