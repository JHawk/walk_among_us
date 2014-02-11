describe("models.Wall", function() {

  var Wall;
  var x, y;
  var boardSpy;

  beforeEach(function() {
    x = 1;
    y = 1;

    boardSpy = jasmine.createSpyObj('board', ['findPath']);
  
    models.Board.board = boardSpy;

    Wall = new models.Wall(x,y);
  });

  describe("onSelected", function () {
    beforeEach(function () {
    });

    describe("when selection toggled on", function () {
      it("is added to the selected collection", function() {
        Wall.toggleSelection();

        expect(models.Explorable.selected).not.toBeEmpty();
      });
    });
  });
});
