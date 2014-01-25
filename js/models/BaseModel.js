var models = models || {};

models.BaseModel = function (color, mesh) {
  var colors = new style.Colors;

  var external = this;
  var internal = {};

  this.mesh = mesh;
  models.scene.add(mesh);
  
  this.position = function () { return [mesh.position.x, mesh.position.y]; };
  this.isSelected = false;
  this.isHighlighted = false;
  this.isTargetable = true;
  external.color = color;
  external.selectedColor = colors.selectionColor;

  external.currentColor = function () {
    return this.isSelected ? external.selectedColor : external.color;
  };

  external.updateMaterial = function (color) {
    mesh.material.color.setHex(color);
  };

  this.degradeColors = function () {
    external.color = colors.degrade(external.color);
    external.selectedColor = colors.degrade(external.selectedColor);
    external.updateMaterial(external.currentColor());
  };

  var registeredEvents = ["select", "deselect", "remove", "damage"];

  // generates methods :
  //    evented which fires all events
  //    onEvent which adds the event to an array to be fired
  this.generateRegisteredEvents = function () {
    _.each(registeredEvents, function (eventName) {
      var events = [];
      internal[eventName.pastTense()] = function() {
        _.each(events, function(e) { e(); })
      };
      external["on" + eventName.capitalize().pastTense()] = function (e) {
        events.push(e);
      };
    });
  }();

  this.isRemoved = false;

  this.remove = function () {
    internal.removed();
    this.isRemoved = true;
    this.isSelected = false;
    models.scene.remove(this.mesh);
  };

  this.toggleSelection = function () {
    this.isSelected = !this.isSelected;
    if (this.isSelected)
    {
      internal.selected();
    }
    else
    {
      internal.deselected();
    }
    this.mesh.material.color.setHex(this.currentColor());
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

  this.takeHit = function (damage) {
    this.hitPoints = this.hitPoints - damage;
    internal.damaged();
    if (this.hitPoints < 0)
    {
      this.remove();
    }
  };

  return external;
};