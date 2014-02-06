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

  self.createDetail = function (spellName, key) {
    return  "<td class='spellDetail' id='" + spellName + "'>" + spellName + " : " + key + "</td>";
  };

  self.select = function (e) {
    $('.spellDetail').removeClass('selected');
    $(this).addClass('selected');
  };

  self.create = function () {
    var spells = controls.Spells.spells;
    
    _.each(spells.keyActions(), function(spell) {
      display.append(self.createDetail(spell[1].name, spell[0].key));
      display.find('#' + spell[1].name).click(self.select);
    });
    var spellsCount = spells.actions.length;
    $('.spellDetail').first().click();
    var newWidth = $('.spellDetail').width() * spellsCount;
    display.width(newWidth);
    display.show();
    self.centerEl();
  }();
};
