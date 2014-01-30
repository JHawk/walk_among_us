describe("models.Minion", function() {

  var Minion;
  var x, y;

  beforeEach(function() {
    x = 1;
    y = 1;

    Minion = new models.Minion(x,y);
  });

  describe("closeEnough", function () {
    describe("when outside of tolerance", function () {
      it("retruns false", function() {
        expect(true).toBe(false);
      });
    });
  });
});