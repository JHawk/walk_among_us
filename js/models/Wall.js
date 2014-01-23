var model = model || {};

model.Wall = function (color, mesh) {
  var self = this;

  self = _.extend(this, new models.BaseModel(color, mesh));

  return self;
};