/*global Float32Array, mat4 */
var Spaceship;
(function () {
  'use strict';
  Spaceship = function (gl) {
    var shipPositionData = [
        1, -1, 0,
        0, 1, -0.5,
        -1, -1, 0,

        -1, -1, 0,
        0, 1, -0.5,
        0, -1, -1.75,

        0, -1, -1.75,
        0, 1, -0.5,
        1, -1, 0
      ],
      shipColorData = [
        0, 0, 1, 1,
        0, 0, 1, 1,
        0, 0, 1, 1,

        1, 0, 1, 1,
        1, 0, 1, 1,
        1, 0, 1, 1,

        0, 1, 0, 1,
        0, 1, 0, 1,
        0, 1, 0, 1
      ],
      shipPositions,
      shipColors;

    shipPositions = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shipPositions);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shipPositionData),
                  gl.STATIC_DRAW);
    shipPositions.itemSize = 3;
    shipPositions.numItems = shipPositionData.length / shipPositions.itemSize;
    this.shipPositions = shipPositions;

    shipColors = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shipColors);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shipColorData),
                  gl.STATIC_DRAW);
    shipColors.itemSize = 4;
    shipColors.numItems = shipColorData.length / shipColors.itemSize;
    this.shipColors = shipColors;
    this.turnAngle = 0;
    this.speed = 0;
    this.speedTarget = 10;
    this.rotationAngle = 0;
    this.lastTime = Date.now();
  };
  Spaceship.prototype.setRenderer = function (renderer) {
    this.modelMatrix = renderer.modelMatrix;
    this.viewMatrix = renderer.viewMatrix;
    this.mvpMatrix = renderer.mvpMatrix;
    this.perVertexProgramHandle = renderer.perVertexProgramHandle;
    this.projectionMatrix = renderer.projectionMatrix;
  };
  Spaceship.prototype.onDrawFrame = function (gl) {
    var modelMatrix = this.modelMatrix,
      viewMatrix = this.viewMatrix,
      perVertexProgramHandle = this.perVertexProgramHandle,
      time = Date.now(),
      turnAngleTarget = this.turnAngleTarget,
      turnAngle = this.turnAngle,
      speed = this.speed,
      speedTarget = this.speedTarget,
      elapsed = time - this.lastTime,
      rotationAngle = this.rotationAngle,
      speedFactor;

    this.lastTime = time;

    gl.useProgram(this.perVertexProgramHandle);

    this.mvMatrixHandle = gl.getUniformLocation(perVertexProgramHandle,
                                                "u_MVMatrix");
    this.mvpMatrixHandle = gl.getUniformLocation(perVertexProgramHandle,
                                                 "u_MVPMatrix");
    this.positionHandle = gl.getAttribLocation(perVertexProgramHandle,
                                               "a_Position");
    this.colorHandle = gl.getAttribLocation(perVertexProgramHandle,
                                            "a_Color");

    if (turnAngle > turnAngleTarget + 0.01) {
      this.turnAngle -= (elapsed / 800);
    } else if (turnAngle < turnAngleTarget - 0.01) {
      this.turnAngle += (elapsed / 800);
    }

    if (speed > speedTarget + 0.1) {
      this.speed -= (elapsed / 120);
    } else if (speed < speedTarget - 0.1) {
      this.speed += (elapsed / 80);
    }
    speedFactor = this.speed * this.speed / 8000;
    this.rotationAngle += (elapsed / 8000) + speedFactor;

    // Draw the spaceship
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [-0, -2, -7]);
    mat4.rotate(modelMatrix, modelMatrix, Math.PI * 90 / 180, [0, 1, 0]);
    mat4.translate(modelMatrix, modelMatrix, [0, -1, 0]);
    mat4.rotate(modelMatrix, modelMatrix, turnAngle, [1, 0, 0]);
    mat4.rotate(modelMatrix, modelMatrix, -Math.PI * 90 / 180, [0, 1, 0]);
    mat4.rotate(modelMatrix, modelMatrix, rotationAngle, [0, 1, 0]);
    mat4.translate(modelMatrix, modelMatrix, [0, 1, 0.5]);
    this.draw(gl);
  };
  Spaceship.prototype.draw = function (gl) {
    var shipPositions = this.shipPositions,
      positionHandle = this.positionHandle,
      shipColors = this.shipColors,
      colorHandle = this.colorHandle,
      viewMatrix = this.viewMatrix,
      modelMatrix = this.modelMatrix,
      mvMatrixHandle = this.mvMatrixHandle,
      mvpMatrix = this.mvpMatrix,
      mvpMatrixHandle = this.mvpMatrixHandle,
      projectionMatrix = this.projectionMatrix;

    // Pass in the position information
    gl.bindBuffer(gl.ARRAY_BUFFER, shipPositions);
    gl.vertexAttribPointer(positionHandle, shipPositions.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(positionHandle);

    // Pass in the color information
    gl.bindBuffer(gl.ARRAY_BUFFER, shipColors);
    gl.vertexAttribPointer(colorHandle, shipColors.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(colorHandle);

    // This multiplies the view matrix by the model matrix, and stores the
    // result in the MVP matrix (which currently contains model * view).
    mat4.multiply(mvpMatrix, viewMatrix, modelMatrix);

    // Pass in the modelview matrix.
    gl.uniformMatrix4fv(mvMatrixHandle, false, mvpMatrix);

    // This multiplies the modelview matrix by the projection matrix, and
    // stores the result in the MVP matrix
    // (which now contains model * view * projection).
    mat4.multiply(mvpMatrix, projectionMatrix, mvpMatrix);

    // Pass in the combined matrix.
    gl.uniformMatrix4fv(mvpMatrixHandle, false, mvpMatrix);

    // Draw the ship.
    gl.drawArrays(gl.TRIANGLES, 0, shipPositions.numItems);
  };
  Spaceship.prototype.headLeft = function () {
    this.turnAngleTarget = -45 * Math.PI / 180;
  };
  Spaceship.prototype.headRight = function () {
    this.turnAngleTarget = 45 * Math.PI / 180;
  };
  Spaceship.prototype.headStraight = function () {
    this.turnAngleTarget = 0;
  };
  Spaceship.prototype.speedUp = function () {
    this.speedTarget = 100;
  };
  Spaceship.prototype.slowDown = function () {
    this.speedTarget = 10;
  };
  Spaceship.prototype.brake = function () {
    this.speedTarget = 1;
  }
}());
