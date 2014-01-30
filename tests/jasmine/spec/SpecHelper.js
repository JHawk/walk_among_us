var meshSpy, sceneSpy;

beforeEach(function() {
  meshSpy = jasmine.createSpyObj('mesh', ['position']);
  sceneSpy = jasmine.createSpyObj('scene', ['add']);


  models.scene = sceneSpy;

  this.addMatchers({
    toBeEmpty: function() {
      return this.actual.length < 1;
    }
  });
});
