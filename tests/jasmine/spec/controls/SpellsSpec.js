describe("controls.Spells", function() {

  var Spells;

  beforeEach(function() {
    Spells = new controls.Spells();
  });

  describe("available", function () {
    it("will default to at least one", function() {
      expect(Spells.available).not.toBeEmpty();
    });
  });
});    
