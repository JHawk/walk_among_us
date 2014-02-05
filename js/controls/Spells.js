var controls = controls || {};

controls.Spells = function () {
  var self = this;

  self.available = 
    {
      "motivate" : {
        callBack : function(e) {
          e.preventDefault();
          console.log("motivate");
        },
        key : 1
      },
      "explosion" : {
        callBack : function(e) {
          e.preventDefault();
          console.log("explosion");
        },
        key : 2
      }
  };

  return self;
};