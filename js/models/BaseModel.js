var models = models || {};

models.BaseModel = function (color, mesh) {
  var colors = new style.Colors;

  var external = this;
  var internal = {};

  this.mesh = mesh;
  models.scene.add(mesh);
  
  // delegate to the mesh
  this.position = function () { return [mesh.position.x, mesh.position.y]; };
  this.uuid = mesh.uuid;
  
  this.isSelected = false;
  this.isHighlighted = false;
  this.isTargetable = true;
  internal.color = color;
  internal.selectedColor = colors.selectionColor;

  external.color = function () {return internal.color;}
  external.selectedColor = function () {return internal.selectedColor;}

  external.currentColor = function () {
    return this.isSelected ? internal.selectedColor : internal.color;
  };

  external.updateMaterial = function (color) {
    mesh.material.color.setHex(color);
  };

  this.degradeColors = function () {
    internal.color = colors.degrade(internal.color);
    internal.selectedColor = colors.degrade(internal.selectedColor);
    external.updateMaterial(external.currentColor());
  };

  var registeredEvents = ["create", "select", "deselect", "remove", "damage"];

  // generates methods :
  //    evented which fires all events
  //    onEvent which adds the event to an array to be fired
  this.generateRegisteredEvents = function () {
    _.each(registeredEvents, function (eventName) {
      var events = [];
      internal[eventName.pastTense()] = function(m) {
        _.each(events, function(e) { e(m); })
      };
      external["on" + eventName.capitalize().pastTense()] = function (e) {
        events.push(e);
      };
    });
  }();

  this.isRemoved = false;

  this.remove = function () {
    internal.removed(this);
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
    this.isHighlighted = false;    
    this.mesh.material.color.setHex(this.currentColor());
  };

  this.boardPosition = function () {
    return _.map(this.position(), function (i) {
      return Math.round(i / meshes.Wall.size);
    });
  };

  this.takeHit = function (damage, source) {
    var newHp = this.hitPoints - damage;
    
    if (this.setHitPoints)
    {
      this.setHitPoints(newHp);
    }
    else
    {
      this.hitPoints = newHp;
    }

    internal.damaged(source);
    if (this.hitPoints < 0)
    {
      if (this.deadBody) 
      {
        this.deadBody();
      }
      this.remove();
    }
  };

  this.specialAttack = function () {};

  return external;
};