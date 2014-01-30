var helpers = helpers || {};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.pastTense = function () {
  return (this.endsWith('e')) ? (this + 'd') : (this + "ed"); 
};

_.mixin({

});

helpers.Utils = function () {
  var self = this;

  var pi = Math.PI;

  this.radians = function (degrees) {
    return degrees * (pi / 180);
  }

  this.degrees = function (radians) {
    return radians * (180 / pi);
  }

  this.angle = function (from, to) {
    var deltaX = from[0] - to[0];
    var deltaY = from[1] - to[1];
    return Math.atan2(deltaY, deltaX) * (180 / pi);
  };

  this.step = function (from, to, stepSize) {
    var angle = self.angle(to, from);
    var x = stepSize * Math.cos(angle);
    var y = stepSize * Math.sin(angle);
    return [x,y];
  };

  this.magnitude = function (vector1, vector2) {
    var vector = vector1;

    if (vector2) {
      vector = [
        Math.abs(vector1[0] - vector2[0]), 
        Math.abs(vector1[1] - vector2[1])
      ];
    }

    var xSquare = vector[0] * vector[0];
    var ySquare = vector[1] * vector[1];
    
    return Math.sqrt(xSquare + ySquare);
  };

  this.isClose = function(vector1, vector2, tolerance) {
    return self.magnitude(vector1, vector2) > tolerance;
  };
}