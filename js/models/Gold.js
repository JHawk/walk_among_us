var models = models || {};

models.Gold = function (x,y) {
  var self = this;
  self.hitPoints = 10;
  self.name = "Gold";
  self.value = 100;
  
  self.color = new style.Colors().gold;

  self.mesh = new meshes.Wall().create(x, y, self.color);

  self = _.extend(this, new models.Explorable(self));

  self.onRemoved(function () {
    models.Player.player.gold = models.Player.player.gold + self.value;    
  });

  return self;
};