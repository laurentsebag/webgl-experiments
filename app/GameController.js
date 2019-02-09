/*global Renderer, Spaceship, GameConsts*/
var GameController;
(function () {
  'use strict';
  GameController = function (gl) {
    var renderer = new Renderer(gl),
      spaceship = new Spaceship(gl, renderer);

    this.renderer = renderer;
    this.spaceship = spaceship;

    renderer.addObject(spaceship);
  };
  GameController.prototype.onKeyPressed = function (key) {
  };
  GameController.prototype.onSurfaceCreated = function (gl) {
    this.renderer.onSurfaceCreated(gl);
  };
  GameController.prototype.onSurfaceChanged = function (gl, width, height) {
    var renderer = this.renderer;
    renderer.onSurfaceChanged(gl, width, height);
    this.spaceship.setRenderer(renderer);
  };
  GameController.prototype.onDrawFrame = function (gl) {
    this.renderer.onDrawFrame(gl);
  };
  GameController.prototype.onKeyActionStart = function (key) {
    switch (key) {
    case GameConsts.KEY_LEFT:
      this.spaceship.headLeft();
      break;
    case GameConsts.KEY_RIGHT:
      this.spaceship.headRight();
      break;
    case GameConsts.KEY_UP:
      this.spaceship.speedUp();
      break;
    case GameConsts.KEY_DOWN:
      this.spaceship.brake();
      break;
    }
  };
  GameController.prototype.onKeyActionEnd = function (key) {
    switch (key) {
    case GameConsts.KEY_LEFT:
    case GameConsts.KEY_RIGHT:
      this.spaceship.headStraight();
      break;
    case GameConsts.KEY_UP:
    case GameConsts.KEY_DOWN:
      this.spaceship.slowDown();
    }
  };
}());
