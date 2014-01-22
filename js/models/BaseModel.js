var models = models || {};

models.BaseModel = function () {
  colors = new style.Colors;

  this.currentColor = function () {
    return this.isSelected ? colors.selectionColor : this.color;
  };

  // TODO: DRY this up. ///////////////
  var removalEvents = [];

  var removed = function () {
    _.each(removalEvents, function(e) { e(); })
  };

  this.onRemoval = function (e) { 
    removalEvents.push(e);
  };

  var deselectEvents = [];

  var deselected = function () {
    _.each(deselectEvents, function(e) { e(); })
  };

  this.onDeselect = function (e) { 
    deselectEvents.push(e);
  };

  var selectEvents = [];

  var selected = function () {
    _.each(selectEvents, function(e) { e(); })
  };

  this.onSelect = function (e) { 
    selectEvents.push(e);
  };
  // TODO: DRY this up. ///////////////

  this.remove = function () {
    removed();
    models.scene.remove(this.mesh);
  };

  this.toggleSelection = function () {
    this.isSelected = !this.isSelected;
    if (this.isSelected)
    {
      selected();
    }
    else
    {
      deselected();
    }
    this.mesh.material.color.setHex(this.currentColor(model));
  };

  this.highlight = function () {
      this.isHighlighted = true;
      this.mesh.material.color.setHex(colors.highlightColor(this.currentColor()));
  };

  this.unHighlight = function () {
    try {
      this.isHighlighted = false;    
      this.mesh.material.color.setHex(this.currentColor());
    } catch(e) {
      console.log(this);
    }
  };
};