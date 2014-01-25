describe("helpers.Utils", function() {

  var Utils;
  var to, from, stepSize;

  beforeEach(function() {
    stepSize = 1;

    Utils = new helpers.Utils();
  });

  describe("step", function () {
    beforeEach(function () {
      from = [1, 1]
      to   = [3, 1];
    });

    it("will return the correct x", function() {
      var result = Utils.step(from, to, stepSize);    

      expect(result[0]).toEqual(1);
    });
  });
});