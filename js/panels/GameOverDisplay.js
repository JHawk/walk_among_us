var panels = panels || {};

panels.GameOverDisplay = function (focus) {
  var self = this;

  self.id = "gameOverDisplay";

  $( "body" ).append( 
    "<div id='" + self.id + "' class='display' style='position: absolute; right: 0px; top: 0px;'>Game Over</div>" );

  self.isGameOver = false;

  var display = $('#' + self.id);

  self.centerEl = function () {
    display.css("top", Math.max(0, (($(window).height() - display.outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    display.css("left", Math.max(0, (($(window).width() - display.outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
  };

  focus.onRemoved(function () {
    self.centerEl();
    display.show();  
    self.isGameOver = true;
  });
};