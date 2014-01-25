function StubGet() {
  this.getData = null;
}

StubGet.prototype.call = function() {
  var _this = this;
  $.get("can assert on this", function(data) {
    _this.getData = data;
  });

  
};