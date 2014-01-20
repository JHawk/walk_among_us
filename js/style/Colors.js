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

  var hightlightBumpSize = 4;

  this.toHex = function (n) {
    return "#" + n.toString(16).split('.')[0];
  };

  this.highlight = function (color) {
    if (typeof color === 'number')
    {
      return color + (hightlightBumpSize * 0x111111);
    }
  };

  this.minionColor = function () {
    return self.randomColor();
  };
}