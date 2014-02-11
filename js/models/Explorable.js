var models = models || {};

models.Explorable = function (that) {
  var external = this;

  var _$ = models.Explorable;

  external = _.extend(this, new models.BaseModel(that.color, that.mesh));

  external.onSelected(function () { 
    _$.selected.push(that);
  });

  external.onDeselected(function () {
    _$.selected = _.reject(_$.selected, function (e) { return e == that});
  });

  external.onRemoved(function () {
    _$.selected = _.reject(_$.selected, function (e) { return e == that});    
  });

  external.onDamaged(external.degradeColors);

  that.mesh.model = that;

  return external;
};

models.Explorable.selected = [];