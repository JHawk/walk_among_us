var helpers = helpers || {};

helpers.Utils = function () {
  var self = this;

  var pi = Math.PI;

  this.radians = function (degrees) {
    return degrees * (pi / 180);
  }

  this.degrees = function (radians) {
    return radians * (180 / pi);
  }
}