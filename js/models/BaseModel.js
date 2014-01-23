var models = models || {};

models.BaseModel = function (color, mesh) {
  colors = new style.Colors;

  var external = this;
  var internal = {};

  this.mesh = mesh;
  models.scene.add(mesh);
  
  this.position = function () { return [mesh.position.x, mesh.position.y]; };
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

  this.takeHit = function () {
    this.remove();
  };

  return external;
};