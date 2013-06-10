/*globals requestAnimationFrame*/
var GLSurfaceView;
(function () {
  'use strict';
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.msRequestAnimationFrame;
  GLSurfaceView = function (width, height) {
    var canvas = document.createElement('canvas'),
      gl = canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'),
      that = this,
      animate = function () {
        if (that.controller) {
          that.controller.onDrawFrame(that.gl);
        }
        requestAnimationFrame(animate);
      };
    if (height === undefined || width === undefined) {
      throw "GLSurfaceView: Missing argument width or height";
    }
    canvas.height = height;
    canvas.width = width;
    this.el = canvas;
    this.gl = gl;

    animate();
    return this;
  };
  GLSurfaceView.prototype.setSize = function (width, height) {
    var canvas = this.el,
      gl = this.gl,
      controller = this.controller;
    if (width === undefined) {
      width = canvas.width;
    }
    if (height === undefined) {
      height = (canvas.height / canvas.width) * width;
    }
    canvas.width = width;
    canvas.height = height;
    if (controller !== undefined) {
      controller.onSurfaceChanged(gl, width, height);
    }
    return this;
  };
  GLSurfaceView.prototype.setController = function (controller) {
    var canvas = this.el,
      gl = this.gl;
    if (controller === undefined) {
      throw 'Missing argument controller';
    }
    if (typeof controller.onSurfaceCreated !== 'function' ||
        typeof controller.onSurfaceChanged !== 'function' ||
        typeof controller.onDrawFrame !== 'function') {
      throw 'Wrong prototype controller';
    }
    this.controller = controller;
    controller.onSurfaceChanged(gl, canvas.width, canvas.height);
    controller.onSurfaceCreated(gl);
  };
}());
