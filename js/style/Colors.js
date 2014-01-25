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

  this.blockColor = function () {
    return _.sample(blockColors);
  };

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
  // var hits = 0;

  this.degrade = function (color) {
    if (typeof color === 'number')
    {
      var degraded = color - (bumpSize);

      // console.log("hits : " + hits ++);
      // console.log("bumpSize : " + bumpSize);
      // console.log("bumpSize : " + self.toHex(bumpSize));

      // console.log("degraded : " + degraded);
      // console.log("degraded :" + self.toHex(degraded));
      // console.log("----------------------------------");

      // if (self.toHex(degraded).length < 7)
      // {
      //   console.log("color value too low!")
      // } 

      return (degraded < self.lowerBound) ? self.lowerBound : degraded;
    }
  };

  var minionColors = [
    11784241.9694794,
    7133629.223240038,
    3238919.3030391037,
    706394.000864384
  ];

  this.minionColor = function () {
    return _.sample(minionColors);
  };
}