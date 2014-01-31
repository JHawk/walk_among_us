describe("models.Board", function() {

  var Board;
  var width, height;
  var position;

  beforeEach(function() {
    width = 10; 
    height = 10;
    position = {x: 5, y: 5};
    
    Board = new models.Board(width, height);
  });

  describe("emptySpace", function () {
    beforeEach(function () {
    });

    it("removes the current object", function() {
      Board.emptySpace(position);

      expect(Board.grid.getNodeAt(position.x,position.y).walkable).toBeTruthy();
    });
  });
});