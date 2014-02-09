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

  describe("isEmpty", function () {
    var emptyPosition = {x:0,y:0};

    beforeEach(function () {
      Board.emptySpace(emptyPosition);
    });

    it("returns true if position is walkable", function() {
      expect(Board.isEmpty(emptyPosition)).toBeTruthy();
    });

    it("returns false if position isn't walkable", function() {
      expect(Board.isEmpty({x:1,y:1})).toBeFalsy();
    });

    it("returns false if position isn't on grid", function() {
      expect(Board.isEmpty({x:-1, y:-1})).toBeFalsy();
      expect(Board.isEmpty({x:100, y:100})).toBeFalsy();
    });
  });

  describe("centerPosition", function () {
    it("returns the center", function() {
      expect(Board.centerPosition).toEqual([100,100]);
    });
  });
});