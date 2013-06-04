/*jslint browser: true*/
/*global Renderer, GLSurfaceView*/
(function () {
  'use strict';

  var view = new GLSurfaceView(800, 600),
    renderer = new Renderer(view.gl),
    resizeView = function () {
      view.setSize(window.innerWidth - 40);
    };
  view.setRenderer(renderer);

  window.onload = function () {
    document.getElementsByTagName('body')[0].appendChild(view.el);

    resizeView();
  };
  window.onresize = resizeView;


}());
