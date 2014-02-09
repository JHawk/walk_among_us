var controls = controls || {};

controls.Spells = function (mouseControls) {
  var self = this;

  self.hasKey = function (keyCode) {
    return self.keyCodeIndex(keyCode) != undefined;
  };

  self.keyCodeIndex = function (keyCode) {
    return _.find(keys, function (key) {
      return key.keyCode == keyCode;
    });
  };

  self.action = function (keyCode) {
    var spell = _.find(self.keyActions(), function (ka) {
      return ka[0].keyCode == keyCode;
    })[1];
    return function () {
      var player = models.Player.player;
      if (player.gold >= spell.cost)
      {
        player.gold = player.gold - spell.cost;
        spell.callBack();
      }
      else
      {
        console.log("not enough gold");
      }
    };
  };

  self.keyActions = function () {
    return _.filter(_.zip(keys, self.actions), function (ka) {
      return ka[1] != undefined;
    });
  };

  var keys = [
        {
          key : 1,
          keyCode : 49
        },
        {
          key : 2,
          keyCode : 50
        },
        {
          key : 3,
          keyCode : 51
        },
        {
          key : 4,
          keyCode : 52
        },
        {
          key : 5,
          keyCode : 53
        },
        {
          key : 6,
          keyCode : 54
        },
        {
          key : 7,
          keyCode : 55
        },
        {
          key : 8,
          keyCode : 56
        },
        {
          key : 9,
          keyCode : 57
        },
        {
          key : 0,
          keyCode : 58
        }
      ];

  self.actions = 
    [ 
      {
        name : "explorer",
        callBack : models.board.spawnExplorer,
        cost : 10
      },
      {
        name : "fighter",
        callBack : models.board.spawnFighter,
        cost : 20
      },
      {
        name : "motivate",
        callBack : function () {
          mouseControls.currentTarget(
            function (target) {
              target.model.specialAttack();
            }, 
            function () {
              console.log("Motivate missed.");
            }
          );
        },
        cost : 0
      },
      {
        name : "enemy",
        callBack : models.board.spawnEnemy,
        cost : 0
      }
      // ,
      // {
      //   name : "explosion",
      //   callBack : function(e) {
      //     console.log("explosion");
      //     // models.Board.board.
      //   }
      // }
  ];

  controls.Spells.spells = self;

  return self;
};