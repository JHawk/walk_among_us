describe("models.Board", function() {

  var Board;
  var width, height;
  var position;

  beforeEach(function() {
    width = 10; 
    height = 10;
    position = {x: 5, y: 5};
    meshes.Wall.size = 20;
    
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

  describe("centerBlock", function () {
    it("returns the center block", function() {
      expect(Board.centerBlock()).toEqual([5,5]);
    });
  });

  describe("centerPosition", function () {
    it("returns the center", function() {
      expect(Board.centerPosition).toEqual([100,100]);
    });
  });
});