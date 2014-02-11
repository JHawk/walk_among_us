var models = models || {};

models.Explorer = function (p) {
  var self = this;
  
  self.type = "Explorer";
  self.allegiance = "Player";

  self = _.extend(this, new style.Colors());

  self.color = self.explorerColor();
  self.mesh = new meshes.Explorer().create(p[0],p[1],self.color);

  self.hitPoints = 10;
  self.tickSpeedMs = 10;
  self.attackSpeedMs = 500;

  self.attacker = undefined;

  // 1 to 1000
  self.speed = 5;
  self.damage = 1;
  self.delay = 200;

  self.meleeRange = 25.0;

  self = _.extend(this, new models.Minion(this));

  self.actions = [
    "flee",
    "attack"
    // "claim",
    // "wander"
  ];

  self.onDamaged(function (source) {
    self.attacker = source;
  });

  self.hasTarget = function () {
    return self.target && self.target.isSelected;
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