/*global Uint16Array, Float32Array, mat4 */
var Spaceship;
(function () {
  'use strict';
  Spaceship = function (gl) {
    var shipVerticesData = [
      1.000000, 0.166296, -1.000000,
      2.402377, 0.254857, 0.002799,
      2.402377, 0.202140, 0.002799,
      -1.000000, 0.166296, -1.000000,
      1.000000, 0.888525, -0.999999,
      2.402377, 0.254857, -0.032487,
      2.402377, 0.202140, -0.032487,
      -1.000000, 0.888525, -1.000000,
      1.000000, -0.485660, -3.031953,
      -0.999999, -0.485660, -3.031954,
      1.000001, -0.245799, -2.875814,
      -0.999999, -0.245799, -2.875815,
      -1.690724, 0.166295, -0.706288,
      -1.690725, 0.888525, -0.706287,
      -1.690724, 0.166295, -0.706288,
      -1.690725, 0.888525, -0.706287,
      -0.999999, -0.040848, -2.015977,
      1.000000, -0.040848, -2.015977,
      1.000001, 0.440197, -1.937907,
      -1.000000, 0.440197, -1.937907,
      1.000000, 0.166296, 1.000000,
      2.402377, 0.254857, -0.002799,
      2.402377, 0.202140, -0.002799,
      -1.000000, 0.166296, 1.000000,
      1.000000, 0.888525, 0.999999,
      2.402377, 0.254857, 0.032487,
      2.402377, 0.202140, 0.032487,
      -1.000000, 0.888525, 1.000000,
      1.000000, 0.000000, -0.000000,
      -1.000000, 0.000000, 0.000000,
      1.000000, 1.021351, -0.000001,
      -1.000000, 1.021351, 0.000000,
      1.000000, -0.485660, 3.031953,
      -0.999999, -0.485660, 3.031954,
      1.000001, -0.245799, 2.875814,
      -0.999999, -0.245799, 2.875815,
      -1.690724, 0.166295, 0.706288,
      -1.690725, 0.888525, 0.706287,
      -1.690725, -0.000000, 0.000000,
      -1.690725, 1.021351, 0.000000,
      -1.690724, 0.166295, 0.706288,
      -1.690725, 0.888525, 0.706287,
      -0.999999, -0.040848, 2.015977,
      1.000000, -0.040848, 2.015977,
      1.000001, 0.440197, 1.937907,
      -1.000000, 0.440197, 1.937907
    ],
      shipVertexPositionsData = [
        4, 30, 5,
        0, 4, 5,
        17, 16, 8,
        0, 28, 29,
        4, 7, 31,
        28, 0, 6,
        6, 5, 1,
        10, 8, 9,
        19, 18, 10,
        18, 17, 8,
        16, 19, 11,
        38, 39, 13,
        3, 29, 12,
        7, 3, 13,
        31, 7, 39,
        0, 3, 17,
        7, 4, 18,
        4, 0, 18,
        3, 7, 16,
        24, 25, 30,
        20, 26, 25,
        43, 32, 42,
        20, 23, 29,
        24, 30, 31,
        28, 22, 26,
        26, 22, 21,
        34, 35, 33,
        45, 35, 34,
        44, 34, 32,
        42, 33, 35,
        38, 36, 37,
        23, 36, 38,
        27, 37, 23,
        31, 39, 27,
        20, 43, 23,
        27, 45, 44,
        24, 44, 20,
        23, 42, 27,
        30, 1, 5,
        6, 0, 5,
        16, 9, 8,
        3, 0, 29,
        30, 4, 31,
        2, 28, 6,
        2, 6, 1,
        11, 10, 9,
        11, 19, 10,
        10, 18, 8,
        9, 16, 11,
        12, 38, 13,
        29, 38, 12,
        3, 12, 13,
        7, 13, 39,
        3, 16, 17,
        19, 7, 18,
        0, 17, 18,
        7, 19, 16,
        25, 21, 30,
        24, 20, 25,
        32, 33, 42,
        28, 20, 29,
        27, 24, 31,
        20, 28, 26,
        25, 26, 21,
        32, 34, 33,
        44, 45, 34,
        43, 44, 32,
        45, 42, 35,
        39, 38, 37,
        29, 23, 38,
        37, 36, 23,
        39, 37, 27,
        43, 42, 23,
        24, 27, 44,
        44, 43, 20,
        42, 45, 27
      ],
      shipColorData = [
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 0, 1,
        0, 1, 1, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        1, 0, 1, 1,
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 0, 1,
        0, 1, 1, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        1, 0, 1, 1,
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 0, 1,
        0, 1, 1, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        1, 0, 1, 1,
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 0, 1,
        0, 1, 1, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        1, 0, 1, 1,
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        1, 1, 0, 1,
        0, 1, 1, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        1, 0, 1, 1,
        0, 0, 1, 1,
        1, 1, 0, 1,
        0, 1, 1, 1,
        1, 1, 1, 1,
        0, 0, 0, 1,
        1, 0, 1, 1
      ],
      shipNormalData = [
        0.474303, 0.872697, -0.115916,
        0.474303, 0.872697, -0.115916,
        0.474303, 0.872697, -0.115916,
        0.474303, 0.872697, -0.115916,
        0.474303, 0.872697, -0.115916,
        0.474303, 0.872697, -0.115916,
        0.474303, 0.872697, -0.115916,
        0.567875, 0.000000, -0.823115,
        -0.000000, -0.916051, 0.401063,
        -0.000000, -0.986453, -0.164043,
        0.000000, 0.991294, -0.131669,
        0.137082, -0.977141, -0.162494,
        1.000000, 0.000000, 0.000000,
        0.000000, 0.545551, -0.838078,
        0.000000, 0.807144, -0.590354,
        1.000000, -0.000001, 0.000001,
        -1.000000, -0.000001, 0.000000,
        -1.000000, -0.000000, -0.000000,
        -0.069586, -0.984062, -0.163645,
        -0.391315, 0.000000, -0.920257,
        -0.000000, -0.979842, 0.199777,
        0.000000, 0.902223, -0.431271,
        0.474303, 0.872697, 0.115916,
        0.567875, 0.000000, 0.823115,
        -0.000000, -0.916051, -0.401063,
        0.000000, -0.986453, 0.164043,
        0.000000, 0.991294, 0.131669,
        0.142666, -0.989771, 0.000000,
        0.000000, 0.545551, 0.838078,
        0.000000, 0.807144, 0.590354,
        1.000000, -0.000004, -0.000003,
        -1.000000, -0.000002, -0.000000,
        -0.096995, -0.968794, 0.228103,
        -0.391315, 0.000000, 0.920257,
        -0.000000, -0.979842, -0.199777,
        0.000000, 0.902223, 0.431271,
        1.000000, -0.000001, -0.000001,
        0.479605, 0.877485, -0.000000,
        -0.000000, -0.916051, 0.401062,
        1.000000, -0.000004, 0.000003,
        0.000000, -0.973383, -0.229183,
        -0.078350, 0.979751, -0.184254,
        1.000000, -0.000001, 0.000000,
        -0.000000, -0.916051, -0.401062,
        0.137082, -0.977141, 0.162494,
        -0.078350, 0.979751, 0.184254
      ],
      shipVertices,
      shipVertexPositions,
      shipColors,
      shipNormals;

    shipVertices = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shipVertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shipVerticesData),
                  gl.STATIC_DRAW);
    shipVertices.itemSize = 3;
    shipVertices.numItems = shipVerticesData.length / shipVertices.itemSize;
    this.shipVertices = shipVertices;

    shipVertexPositions = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shipVertexPositions);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shipVertexPositionsData),
                  gl.STATIC_DRAW);
    shipVertexPositions.itemSize = 1;
    shipVertexPositions.numItems = shipVertexPositionsData.length /
      shipVertexPositions.itemSize;
    this.shipVertexPositions = shipVertexPositions;

    shipColors = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shipColors);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shipColorData),
                  gl.STATIC_DRAW);
    shipColors.itemSize = 4;
    shipColors.numItems = shipColorData.length / shipColors.itemSize;
    this.shipColors = shipColors;

    shipNormals = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, shipNormals);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shipNormalData),
                  gl.STATIC_DRAW);
    shipNormals.itemSize = 3;
    shipNormals.numItems = shipNormalData.length / shipNormals.itemSize;
    this.shipNormals = shipNormals;

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
    this.normalHandle = gl.getAttribLocation(perVertexProgramHandle,
                                             "a_Normal");

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
    mat4.translate(modelMatrix, modelMatrix, [-2, -2, -6]);
    mat4.scale(modelMatrix, modelMatrix, [0.6, 0.6, 0.6]);
    mat4.rotate(modelMatrix, modelMatrix, Math.PI * 90 / 180, [0, 1, 0]);
    mat4.translate(modelMatrix, modelMatrix, [0, -1, 0]);
    mat4.rotate(modelMatrix, modelMatrix, turnAngle, [1, 0, 0]);
    mat4.rotate(modelMatrix, modelMatrix, -Math.PI * 90 / 180, [0, 1, 0]);
    mat4.rotate(modelMatrix, modelMatrix, rotationAngle, [0, 1, 0]);
    mat4.translate(modelMatrix, modelMatrix, [0, 1, 0.5]);
    this.draw(gl);
  };
  Spaceship.prototype.draw = function (gl) {
    var shipVertices = this.shipVertices,
      shipVertexPositions = this.shipVertexPositions,
      positionHandle = this.positionHandle,
      shipColors = this.shipColors,
      colorHandle = this.colorHandle,
      shipNormals = this.shipNormals,
      normalHandle = this.normalHandle,
      viewMatrix = this.viewMatrix,
      modelMatrix = this.modelMatrix,
      mvMatrixHandle = this.mvMatrixHandle,
      mvpMatrix = this.mvpMatrix,
      mvpMatrixHandle = this.mvpMatrixHandle,
      projectionMatrix = this.projectionMatrix;

    // Pass in the position information
    gl.bindBuffer(gl.ARRAY_BUFFER, shipVertices);
    gl.vertexAttribPointer(positionHandle, shipVertices.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(positionHandle);

    // Pass in the color information
    gl.bindBuffer(gl.ARRAY_BUFFER, shipColors);
    gl.vertexAttribPointer(colorHandle, shipColors.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(colorHandle);

    // Pass in the normal information
    gl.bindBuffer(gl.ARRAY_BUFFER, shipNormals);
    gl.vertexAttribPointer(normalHandle, shipNormals.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(normalHandle);

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
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, shipVertexPositions);
    gl.drawElements(gl.TRIANGLES, shipVertexPositions.numItems,
                    gl.UNSIGNED_SHORT, 0);
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
