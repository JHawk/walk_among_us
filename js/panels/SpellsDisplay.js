var panels = panels || {};

panels.SpellsDisplay = function (spells) {
  var self = this;

  self.id = "spellsDisplay";

  $( "body" ).append(
    "<table id='" + self.id + "' class='display' style='position: absolute;'>" +
      "<tbody>" +
        "<tr>" + 
        "</tr>" +
      "</tbody>" +
    "</table>");

  var display = $('#' + self.id);
  display.hide();

  self.centerEl = function () {
    display.css("top", Math.max(0, (($(window).height() - display.outerHeight()) - display.height()) + 
                                                $(window).scrollTop()) + "px");
    display.css("left", Math.max(0, (($(window).width() - display.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
  };

  self.createDetail = function (spellName, spell) {
    return  "<td class='spellDetail' id='" + spellName + "'>" + spellName + " : " + spell.key + "</td>";
  };

  self.select = function (e) {
    $('.spellDetail').removeClass('selected');
    $(this).addClass('selected');
  };

  self.create = function () {
    var spells = new controls.Spells();
    _.each(spells.available, function(spell, spellName) {
      display.append(self.createDetail(spellName, spell));
      // display.find('#' + spellName).click(self.select);
    });
    var spellsCount = _.keys(spells.available).length;
    var newWidth = $('.spellDetail').width() * spellsCount;
    display.width(newWidth);
    display.show();
    self.centerEl();
  }();
};
