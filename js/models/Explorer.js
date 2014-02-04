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

  this.motivate = function() {
    self.speed++;
    console.log("Speed = " + self.speed);
    console.log("HP = " + self.hitPoints);
  };

  this.specialAttack = function () {
    self.takeHit(1);
    self.motivate();
  };

  this.acquireTarget = function () {
    var walls = models.Board.board.targetableWalls;
    if (walls.length > 0)
    {
      this.target = _.sample(walls);
    }
  }

  return _.extend(this, new models.Minion(this));
};