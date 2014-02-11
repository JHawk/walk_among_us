var models = models || {};

models.Fighter = function (p) {
  var self = this;

  self.type = "Fighter";
  self.allegiance = "Player";

  self = _.extend(this, new style.Colors());

  self.color = self.fighterColor();
  self.mesh = new meshes.Fighter().create(p[0],p[1],self.color);

  self.hitPoints = 20;
  self.tickSpeedMs = 10;
  self.attackSpeedMs = 500;
  self.perseption = 5 * meshes.Wall.size;

  // 1 to 1000
  self.speed = 3;
  self.damage = 1;
  self.delay = 200;
  self.meleeRange = 25.0;

  self.canSeeTarget = function() {
    return self.isClose(self.position(), self.target.position(), self.perseption);
  };

  self.actions = [
    "attack"
    // ,
    // "wander"
  ];

  self.hasTarget = function () {
    var liveTarget = self.target && !self.target.isRemoved;
    return liveTarget && self.canSeeTarget();
  };

  self = _.extend(this, new models.Minion(this));

  self.acquireTarget = function () {
    var minions = _.reject(models.Minion.alive.concat(models.Focus.alive), function (m) { 
      return m.mesh.uuid == self.mesh.uuid || m.allegiance == self.allegiance;
    });
    if (minions.length > 0)
    {
      self.target = _.sample(minions);
    }
  }

  return self;
};