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

  describe("magnitude", function () {
    it("will return the correct value with one arg", function() {
      var result = Utils.magnitude([3,4]);    

      expect(result).toEqual(5);
    });

    it("will return the correct value with two args", function() {
      var result = Utils.magnitude([1,2], [4,6]);    

      expect(result).toEqual(5);
    });
  });      

  // describe("isClose", function () {
  //   var from, to, tolerance;
      
  //   describe("when distance is greater than tolerance", function () {
  //     beforeEach(function() {
  //       from = [0,0];
  //       to = [3,4];
  //       tolerance = 5.1;
  //     });

  //     it("retruns false", function() {
  //       expect(Utils.isClose(from, to, tolerance)).toBeFalsy();
  //     });
  //   });
  // });
});