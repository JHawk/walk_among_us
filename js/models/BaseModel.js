var models = models || {};

models.BaseModel = function () {
  colors = new style.Colors;

  this.currentColor = function () {
    return this.isSelected ? colors.selectionColor : this.color;
  };

  var onSelect = function () {
    console.log("selected")
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
    try {
      this.isHighlighted = true;
      this.mesh.material.color.setHex(colors.highlightColor(this.currentColor()));
    } catch(e) {
      console.log(this);
    }
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