describe("models.BaseModel", function() {
  var BaseModel, ModelInstance;
  var color;
  var meshSpy, sceneSpy;
  var colors = new style.Colors();

  beforeEach(function() {
    color = 11824921;
    meshSpy = jasmine.createSpyObj('mesh', ['position']);
    sceneSpy = jasmine.createSpyObj('scene', ['add']);
    
    models.scene = sceneSpy;

    BaseModel = new models.BaseModel(color, meshSpy);

    function Model () {
      var self = this;
      self = _.extend(this, BaseModel);
      return self;
    };

    ModelInstance = new Model();
  });

  describe("On initialization", function () {
    it("will add the mesh to the scene", function () {
      expect(sceneSpy.add).toHaveBeenCalledWith(meshSpy);
    });

    it("will set the selectedColor", function () {
      expect(ModelInstance.selectedColor).toEqual(colors.selectionColor);
    });
  });

  describe("When not selected", function () {
    beforeEach(function () {
      ModelInstance.isSelected = false;
    });

    describe("currentColor", function () {
      it("will be the base color", function() {
        expect(ModelInstance.currentColor()).toEqual(color);
      });
    });
  });

  describe("When selected", function () {
    beforeEach(function () {
      ModelInstance.isSelected = true;
    });

    it("will be selected", function () {
      expect(ModelInstance.isSelected).toBeTruthy();
    });

    describe("currentColor", function () {
      it("will be the selection color", function() {
        expect(ModelInstance.currentColor()).toEqual(colors.selectionColor);
      });
    });
  });
});