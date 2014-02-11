var style = style || {};

style.Colors = function () {
  var self = this;

  this.randomColor = function () {
    var randomColor = Math.random() * 0xffffff;
    console.log("random color : " + randomColor);
    return randomColor;
  };

  var blockColors = [
    10831884.834838064, 
    0xB3432B,
    8801363.674616564,
    11824921.967054684
  ];

  self.tileColor = 7504561.982380722;

  this.blockColor = function () {
    return _.sample(blockColors); // self.randomColor();
  };

  this.focusColor = 11080712.866881756;

  this.directionalLight = "#ffffff";
  this.ambientLight = 0x001100;
  this.floor = 0xB0A6A4;
  this.selectionColor = 11784241.9694794;

  this.toHex = function (n) {
    return "#" + n.toString(16).split('.')[0];
  };

  var hightlightBumpSize = 4;

  this.highlightColor = function (color) {
    if (typeof color === 'number')
    {
      return color + (hightlightBumpSize * 0x111111);
    }
  };

  var degradeBumps = 1;
  var bumpSize = degradeBumps * 0x111111;
  this.lowerBound = bumpSize;

  this.degrade = function (color) {
    if (typeof color === 'number')
    {
      var degraded = color - (bumpSize);
      return (degraded < self.lowerBound) ? self.lowerBound : degraded;
    }
  };

  var explorerColors = [
    11784241.9694794,
    7133629.223240038,
    3238919.3030391037,
    706394.000864384
  ];

  this.explorerColor = function () {
    return _.sample(explorerColors) /*self.randomColor()*/;
  };

  var fighterColors = [
    13421772,
    16046570.48886231,
    5652792.846400604
  ];

  this.fighterColor = function () {
    return _.sample(fighterColors);
  };

  this.gold = 16766720;
}