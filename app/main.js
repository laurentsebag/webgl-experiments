/*jslint browser: true*/
/*global GameController, Renderer, GLSurfaceView*/
(function () {
  'use strict';

  var view = new GLSurfaceView(800, 600),
    gameController = new GameController(view.gl),
    resizeView = function () {
      view.setSize(window.innerWidth - 40);
    };
  view.setController(gameController);

  window.onload = function () {
    document.getElementsByTagName('body')[0].appendChild(view.el);

    resizeView();
  };
  window.onresize = resizeView;


}());
