/*global Renderer, Spaceship*/
var GameController;
(function () {
  'use strict';
  GameController = function (gl) {
    var renderer = new Renderer(gl),
      spaceship = new Spaceship(gl, renderer),
      spaceship2 = new Spaceship(gl, renderer);

    this.renderer = renderer;
    this.spaceship = spaceship;
    this.spaceship2 = spaceship2;

    setTimeout(function () {
      renderer.addObject(spaceship2);
      spaceship2.move();
    }, 1000);
    setTimeout(function () {
      spaceship2.move();
    }, 3000);
    renderer.addObject(spaceship);
  };
  GameController.prototype.onKeyPressed = function (key) {
    this.spaceship.move();
  };
  GameController.prototype.onSurfaceCreated = function (gl) {
    this.renderer.onSurfaceCreated(gl);
  };
  GameController.prototype.onSurfaceChanged = function (gl, width, height) {
    var renderer = this.renderer;
    renderer.onSurfaceChanged(gl, width, height);
    this.spaceship.setRenderer(renderer);
    this.spaceship2.setRenderer(renderer);
  };
  GameController.prototype.onDrawFrame = function (gl) {
    this.renderer.onDrawFrame(gl);
  };
}());
