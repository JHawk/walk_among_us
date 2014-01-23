var models = models || {};

models.BaseModel = function (color, mesh) {
  colors = new style.Colors;

  var base = this;

  this.mesh = mesh;
  this.isSelected = false;
  this.isHighlighted = false;
  this.isTargetable = true;
  this.color = color;

  this.currentColor = function () {
    return this.isSelected ? colors.selectionColor : this.color;
  };

  var registeredEvents = ["select", "deselect", "remove"];

  // generates methods :
  //    evented which fires all events
  //    onEvent which adds the event to an array to be fired
  this.generateRegisteredEvents = function () {
    _.each(registeredEvents, function (eventName) {
      var events = [];
      base[eventName.pastTense()] = function() {
        _.each(events, function(e) { e(); })
      };
      base["on" + eventName.capitalize()] = function (e) {
        events.push(e);
      };
    });
  }();

  this.remove = function () {
    base.removed();
    models.scene.remove(this.mesh);
  };

  this.toggleSelection = function () {
    this.isSelected = !this.isSelected;
    if (this.isSelected)
    {
      base.selected();
    }
    else
    {
      base.deselected();
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

  this.takeHit = function () {
    this.remove();
  };

  return base;
};