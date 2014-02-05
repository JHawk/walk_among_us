describe("models.Minion", function() {

  var Minion;
  var x, y;
  var boardSpy, isCloseSpy, targetSpy, thatSpy;

  beforeEach(function() {
    x = 1;
    y = 1;

    boardSpy = jasmine.createSpyObj('board', ['findPath']);
    
    targetSpy = jasmine.createSpyObj('target', ['position', 'boardPosition']);
    targetSpy.boardPosition.andReturn([2,3]);
    
    meshSpy = jasmine.createSpyObj('mesh', ['uuid', 'position']);
    meshSpy.position = [1,1];

    thatSpy = jasmine.createSpyObj('that', ['color', 'mesh', 'canAttack', 'attack']);
    
    thatSpy.actions = ['attack'];
    thatSpy.color = "#111111";
    thatSpy.mesh = meshSpy;

    models.Board.board = boardSpy;

    Minion = new models.Minion(thatSpy);

    isCloseSpy = spyOn(Minion, "isClose");
  });

  describe("takeAction", function () {
    var attackSpy, advanceSpy;

    beforeEach(function () {
      attackSpy = spyOn(Minion, "attack");
      advanceSpy = spyOn(Minion, "advance");
    });

    // describe("when no target set", function () {
    //   it("does nothing", function() {
    //     Minion.takeAction();

    //     expect(attackSpy).not.toHaveBeenCalled();
    //     expect(advanceSpy).not.toHaveBeenCalled();
    //   });
    // });

    describe("when target set", function () {
      beforeEach(function() {
        thatSpy.target = targetSpy;
      });

      describe("and in range", function () {
        beforeEach(function() {
          thatSpy.canAttack.andReturn(true);
        });

        it("will attack", function() {
          Minion.takeAction();

          expect(thatSpy.attack).toHaveBeenCalled();
        });
      });

      describe("and not in range", function () {
        beforeEach(function() {
          thatSpy.canAttack.andReturn(false);
        });

        it("will advance", function() {
          Minion.takeAction();

          expect(advanceSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe("setPath", function () {
    var path;

    beforeEach(function() {
      path = [[0,0],[1,0]];
      thatSpy.target = targetSpy;
    });

    it("will fetch the path from the board", function() {
      boardSpy.findPath.andReturn(path);

      Minion.setPath();

      expect(Minion.currentPath).toEqual(path.slice(1));
    });
  });

  describe("fromBoard", function () {
    it("will return the corner point of the target", function() {
      expect(Minion.fromBoard([1,1])).toEqual([20,20]);
    });
  });

  describe("destination", function () {
    var path;

    beforeEach(function() {
      path = [[0,0],[1,0],[2,1]];
      thatSpy.target = targetSpy;

      boardSpy.findPath.andReturn(path);
    });
    
    describe("when no path set", function () {
      it("will set it", function() {
        Minion.destination();

        expect(Minion.currentPath).not.toBeEmpty();
      });
    });

    describe("when empty path set", function () {
      it("will set it", function() {
        Minion.currentPath = [];

        Minion.destination();

        expect(Minion.currentPath).not.toBeEmpty();
      });
    });
    
    describe("when no current destination", function () {
      it("will return the first leg of the path", function() {
        Minion.destination();

        expect(Minion.currentDestination).toBeDefined();
      });

      it("will consume the path", function() {
        Minion.destination();

        expect(Minion.currentPath.length).toEqual(2);
      });
    });

    describe("when the destination has been reached", function () {
      beforeEach(function () {
        self.currentDestination = [5,6];
        isCloseSpy.andReturn(true);
      });

      it("will return the first leg of the path", function() {
        Minion.destination();

        expect(Minion.currentDestination).toBeDefined();
      });

      it("will consume the path", function() {
        Minion.destination();

        expect(Minion.currentPath.length).toEqual(2);
      });
    });

    describe("when the destination is not close", function () {
      var destination = [5,6];

      beforeEach(function () {
        Minion.currentDestination = destination;
        isCloseSpy.andReturn(false);
      });

      it("will return the current destination", function() {
        expect(Minion.destination()).toEqual(destination);
      });
    });
  });
});
