describe("controls.Spells", function() {

  var Spells;

  var boardSpy, mouseControlsSpy;

  beforeEach(function() {
    boardSpy = jasmine.createSpyObj('board', ['spawnExplorer', 'spawnFighter']);
    mouseControlsSpy = jasmine.createSpyObj('mouseControl', ['currentTarget']);

    models.board = boardSpy;

    Spells = new controls.Spells();
  });

  describe("available", function () {
    it("will default to at least one", function() {
      expect(Spells.actions).not.toBeEmpty();
    });
  });
});    
