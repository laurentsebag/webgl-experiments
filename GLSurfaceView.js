/*globals requestAnimationFrame*/
var GLSurfaceView;
(function () {
  'use strict';
  GLSurfaceView = function (width, height) {
    var canvas = document.createElement('canvas'),
      gl = canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'),
      that = this,
      animate = function () {
        if (that.renderer) {
          that.renderer.onDrawFrame(that.gl);
        }
        requestAnimationFrame(animate);
      };
    if (height !== undefined && width !== undefined) {
      canvas.height = height;
      canvas.width = width;
    }
    this.el = canvas;
    this.gl = gl;

    animate();
    return this;
  };
  GLSurfaceView.prototype.setSize = function (width, height) {
    var canvas = this.el,
      gl = this.gl,
      renderer = this.renderer;
    if (width === undefined) {
      width = canvas.width;
    }
    if (height === undefined) {
      height = (canvas.height / canvas.width) * width;
    }
    canvas.width = width;
    canvas.height = height;
    if (renderer !== undefined) {
      renderer.onSurfaceChanged(gl, width, height);
    }
    return this;
  };
  GLSurfaceView.prototype.setRenderer = function (renderer) {
    var canvas = this.el,
      gl = this.gl;
    if (renderer === undefined) {
      throw 'Missing argument renderer';
    }
    if (typeof renderer.onSurfaceCreated !== 'function' ||
        typeof renderer.onSurfaceChanged !== 'function' ||
        typeof renderer.onDrawFrame !== 'function') {
      throw 'Wrong prototype renderer';
    }
    this.renderer = renderer;
    renderer.onSurfaceChanged(gl, canvas.width, canvas.height);
    renderer.onSurfaceCreated(gl);
  };
}());
