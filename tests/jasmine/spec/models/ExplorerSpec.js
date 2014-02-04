describe("models.Explorer", function() {

  var Explorer;
  var x, y;
  var boardSpy, isCloseSpy, targetSpy;

  beforeEach(function() {
    x = 1;
    y = 1;

    boardSpy = jasmine.createSpyObj('board', ['findPath']);
    targetSpy = jasmine.createSpyObj('target', ['position', 'boardPosition']);
    targetSpy.boardPosition = [2,3];

    models.Board.board = boardSpy;

    Explorer = new models.Explorer(x,y);

    isCloseSpy = spyOn(Explorer, "isClose");
  });

  describe("acquireTarget", function () {
    describe("when no targets available", function () {
      it("does nothing", function() {
        boardSpy.targetableWalls = [];

        Explorer.acquireTarget();

        expect(Explorer.target).toBe(undefined);
      });
    });

    describe("when targets available", function () {
      it("sets the target", function() {
        var target = 1;

        boardSpy.targetableWalls = [target];

        Explorer.acquireTarget();

        expect(Explorer.target).toBe(target);
      });
    });
  });
});