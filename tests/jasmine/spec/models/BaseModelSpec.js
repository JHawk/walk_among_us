describe("models.BaseModel", function() {
  var BaseModel, ModelInstance;
  var color;
  var meshSpy, sceneSpy, updateMaterialSpy;
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

    updateMaterialSpy = spyOn(BaseModel, 'updateMaterial');
  });

  describe("On initialization", function () {
    it("will add the mesh to the scene", function () {
      expect(sceneSpy.add).toHaveBeenCalledWith(meshSpy);
    });

    it("will set the selectedColor", function () {
      expect(ModelInstance.selectedColor()).toEqual(colors.selectionColor);
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

      describe("color is degraded", function () {
        beforeEach(function () {
          ModelInstance.degradeColors();
        });

        it("will be the degraded color", function() {
          var result = ModelInstance.currentColor();

          expect(result).toEqual(ModelInstance.color());
          expect(result).not.toEqual(color);
        });
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

      describe("color is degraded", function () {
        beforeEach(function () {
          ModelInstance.degradeColors();
        });

        it("will be the degraded selection color", function() {
          expect(ModelInstance.currentColor()).toEqual(ModelInstance.selectedColor());
          expect(ModelInstance.currentColor()).not.toEqual(colors.selectionColor);
        });
      });
    });
  });

  describe("degradeColors", function () {
    beforeEach(function () {
      ModelInstance.degradeColors();
    });

    it("will update the ModelInstance", function () {
      expect(BaseModel.color()).toEqual(ModelInstance.color());
      expect(BaseModel.selectedColor()).toEqual(ModelInstance.selectedColor());
    });

    it("will update the material", function () {
      expect(updateMaterialSpy).toHaveBeenCalledWith(ModelInstance.currentColor());
    });

    it("will set the color to the degraded color", function() {
      expect(ModelInstance.color()).not.toEqual(color);
    });

    it("will set the selected color to the degraded selected color", function() {
      expect(ModelInstance.selectedColor()).not.toEqual(colors.selectionColor);
    });
  });
});