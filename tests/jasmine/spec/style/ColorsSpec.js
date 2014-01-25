describe("style.Colors", function() {

  var Colors;

  beforeEach(function() {
    Colors = new style.Colors();
  });

  describe("degrade", function () {
    it("will return a smaller value than the number passed in", function() {
      var color = Colors.blockColor();    

      expect(Colors.degrade(color)).toBeLessThan(color);
    });
  });
});