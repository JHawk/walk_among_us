var models = models || {};

models.Explorer = function (x,y) {
  var self = this;
  self.name = "Explorer";

  self = _.extend(this, new style.Colors());

  self.color = self.explorerColor();
  self.mesh = new meshes.Explorer().create(x,y,self.color);

  self.hitPoints = 10;
  self.tickSpeedMs = 10;
  self.attackSpeedMs = 500;

  // 1 to 1000
  self.speed = 5;
  self.damage = 1;
  self.delay = 200;

  self.meleeRange = 25.0;

  self = _.extend(this, new models.Minion(this));

  self.speedUp = function () {
    self.speed++;
    console.log("Speed Up : " + self.speed);
  };

  self.motivate = function() {
    console.log("Motivated!");
    self.takeHit(1);
    self.speedUp();
  };

  self.specialAttack = function () {
    self.motivate();
  };

  self.acquireTarget = function () {
    var walls = models.Board.board.targetableWalls;
    if (walls.length > 0)
    {
      self.target = _.sample(walls);
    }
  }

  return self;
};