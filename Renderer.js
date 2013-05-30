/*jslint browser: true*/
/*global Float32Array, mat2, mat4*/
var Renderer;
(function () {
  'use strict';

  var cubePositionData = [
    // X, Y, Z
    // Front face
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    // Right face
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    // Back face
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    // Left face
    -1.0, 1.0, -1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    // Bottom face
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0
  ],
    cubeColorData = [
      // R, G, B, A
      // Front face (red)
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      // Right face (green)
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      // Back face (blue)
      0.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0,
      // Left face (yellow)
      1.0, 1.0, 0.0, 1.0,
      1.0, 1.0, 0.0, 1.0,
      1.0, 1.0, 0.0, 1.0,
      1.0, 1.0, 0.0, 1.0,
      1.0, 1.0, 0.0, 1.0,
      1.0, 1.0, 0.0, 1.0,
      // Top face (cyan)
      0.0, 1.0, 1.0, 1.0,
      0.0, 1.0, 1.0, 1.0,
      0.0, 1.0, 1.0, 1.0,
      0.0, 1.0, 1.0, 1.0,
      0.0, 1.0, 1.0, 1.0,
      0.0, 1.0, 1.0, 1.0,
      // Bottom face (magenta)
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0
    ],
    cubeNormalData = [
      // X, Y, Z
      // The normal is used in light calculations and is a vector which points
      // orthogonal to the plane of the surface. For a cube model, the normals
      // should be orthogonal to the points of each face.
      // Front face
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0,
      // Right face
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      // Back face
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      0.0, 0.0, -1.0,
      // Left face
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      -1.0, 0.0, 0.0,
      // Top face
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      // Bottom face
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0,
      0.0, -1.0, 0.0
    ],
    getVertexShader = function () {
      var vertexShader = [
        "uniform mat4 u_MVPMatrix;", // A constant representing the combined
                                     // model/view/projection matrix.
        "uniform mat4 u_MVMatrix;",  // A constant representing the combined
                                     //model/view matrix.
        "uniform vec3 u_LightPos;",  // The position of the light in eye space.

        "attribute vec4 a_Position;", // Per-vertex position information we
                                      //will pass in.
        "attribute vec4 a_Color;", // Per-vertex color information we will
                                   // pass in.
        "attribute vec3 a_Normal;", // Per-vertex normal information we will
                                    // pass in.

        "varying vec4 v_Color;", // This will be passed into the fragment
                                 // shader.

        "void main()", // The entry point for our vertex shader.
        "{",
        // Transform the vertex into eye space.
        "   vec3 modelViewVertex = vec3(u_MVMatrix * a_Position);",
        // Transform the normal's orientation into eye space.
        "   vec3 modelViewNormal = vec3(u_MVMatrix * vec4(a_Normal, 0.0));",
        // Will be used for attenuation.
        "   float distance = length(u_LightPos - modelViewVertex);",
        // Get a lighting direction vector from the light to the vertex.
        "   vec3 lightVector = normalize(u_LightPos - modelViewVertex);",
        // Calculate the dot product of the light vector and vertex normal. If
        // the normal and light vector are
        // pointing in the same direction then it will get max illumination.
        "   float diffuse = max(dot(modelViewNormal, lightVector), 0.1);",
        // Attenuate the light based on distance.
        "   diffuse = diffuse * (1.0 / (1.0 + (0.25 * distance * distance)));",
        // Multiply the color by the illumination level. It will be
        // interpolated across the triangle.
        "   v_Color = a_Color * diffuse;",
        // gl_Position is a special variable used to store the final position.
        // Multiply the vertex by the matrix to get the final point in
        // normalized screen coordinates.
        "   gl_Position = u_MVPMatrix * a_Position;",
        "}"
      ];
      return vertexShader.join("\n");
    },
    getFragmentShader = function () {
      var fragmentShader = [
        // Set the default precision to medium. We don't need as high of a
        // precision in the fragment shader.
        "precision mediump float;",
        // This is the color from the vertex shader interpolated across the 
        // triangle per fragment.
        "varying vec4 v_Color;",
        // The entry point for our fragment shader.
        "void main()",
        "{",
        // Pass the color directly through the pipeline.
        "   gl_FragColor = v_Color;",
        "}"
      ];
      return fragmentShader.join("\n");
    };

  Renderer = function (gl) {
    var cubePositions,
      cubeColors,
      cubeNormals;

    cubePositions = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubePositions);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubePositionData),
                  gl.STATIC_DRAW);
    cubePositions.itemSize = 3;
    cubePositions.numItems = 36;
    this.cubePositions = cubePositions;

    cubeColors = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeColors);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeColorData),
                  gl.STATIC_DRAW);
    cubeColors.itemSize = 4;
    cubeColors.numItems = 36;
    this.cubeColors = cubePositions;

    cubeNormals = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormals);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeNormalData),
                  gl.STATIC_DRAW);
    cubeNormals.itemSize = 3;
    cubeNormals.numItems = 36;
    this.cubeNormals = cubeNormals;

    this.lightModelMatrix = mat4.create();
    this.lightPosInModelSpace = [0, 0, 0, 1];
    this.lightPosInWorldSpace = mat2.create();
    this.lightPosInEyeSpace = mat2.create();
    this.modelMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this.mvpMatrix = mat4.create();
  };
  Renderer.prototype.onSurfaceCreated = function (gl) {
    var viewMatrix = this.viewMatrix,
      vertexShaderHandle,
      fragmentShaderHandle,
      pointVertexShaderHandle,
      pointFragmentShaderHandle,
      perVertexProgramHandle,
      pointProgramHandle,
      eye = [0, 0, -0.5],
      look = [0, 0, -5],
      up = [0, 1, 0],
      // Define a simple shader program for our point.
      pointVertexShader = [
        "uniform mat4 u_MVPMatrix;",
        "attribute vec4 a_Position;",
        "void main()",
        "{",
        "   gl_Position = u_MVPMatrix",
        "               * a_Position;",
        "   gl_PointSize = 5.0;",
        "}"
      ].join("\n"),
      pointFragmentShader = [
        "precision mediump float;",
        "void main()",
        "{",
        "   gl_FragColor = vec4(1.0,",
        "   1.0, 1.0, 1.0);",
        "}"
      ].join("\n");

    mat4.lookAt(viewMatrix, eye, look, up);
    this.viewMatrix = viewMatrix;

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    vertexShaderHandle = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderHandle, getVertexShader());
    gl.compileShader(vertexShaderHandle);
    if (!gl.getShaderParameter(vertexShaderHandle, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(vertexShaderHandle));
      return null;
    }

    fragmentShaderHandle = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderHandle, getFragmentShader());
    gl.compileShader(fragmentShaderHandle);
    if (!gl.getShaderParameter(fragmentShaderHandle, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(fragmentShaderHandle));
      return;
    }

    perVertexProgramHandle = gl.createProgram();
    gl.attachShader(perVertexProgramHandle, vertexShaderHandle);
    gl.attachShader(perVertexProgramHandle, fragmentShaderHandle);
/*
    gl.bindAttribLocation(perVertexProgramHandle, 0, "a_Position");
    gl.bindAttribLocation(perVertexProgramHandle, 1, "a_Color");
    gl.bindAttribLocation(perVertexProgramHandle, 2, "a_Normal");
*/
    gl.linkProgram(perVertexProgramHandle);
    this.perVertexProgramHandle = perVertexProgramHandle;
    if (!gl.getProgramParameter(perVertexProgramHandle, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
      return;
    }

    pointVertexShaderHandle = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(pointVertexShaderHandle, pointVertexShader);
    gl.compileShader(pointVertexShaderHandle);
    if (!gl.getShaderParameter(pointVertexShaderHandle, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(pointVertexShaderHandle));
      return null;
    }

    pointFragmentShaderHandle = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(pointFragmentShaderHandle, pointFragmentShader);
    gl.compileShader(pointFragmentShaderHandle);
    if (!gl.getShaderParameter(pointFragmentShaderHandle, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(pointFragmentShaderHandle));
      return null;
    }

    pointProgramHandle = gl.createProgram();
    gl.attachShader(pointProgramHandle, pointVertexShaderHandle);
    gl.attachShader(pointProgramHandle, pointFragmentShaderHandle);
    gl.bindAttribLocation(pointProgramHandle, 0, "a_Position");
    gl.linkProgram(pointProgramHandle);
    this.pointProgramHandle = pointProgramHandle;
    if (!gl.getProgramParameter(pointProgramHandle, gl.LINK_STATUS)) {
      alert("Could not initialise shaders");
      return;
    }

  };
  Renderer.prototype.onSurfaceChanged = function (gl, width, height) {
    var ratio = width / height,
      left = -ratio,
      right = ratio,
      bottom = -1,
      top = 1,
      near = 1,
      far = 10,
      projectionMatrix;

    gl.viewport(0, 0, width, height);

    // Create a new perspective projection matrix. The height will stay the same
    // while the width will vary as per aspect ratio.
    projectionMatrix = mat4.create();
    mat4.frustum(projectionMatrix, left, right, bottom, top, near, far);
    this.projectionMatrix = projectionMatrix;
  };
  Renderer.prototype.onDrawFrame = function (gl) {
    var angleInDegrees,
      angleInRadians,
      perVertexProgramHandle = this.perVertexProgramHandle,
      time,
      lightModelMatrix = this.lightModelMatrix,
      lightPosInEyeSpace = this.lightPosInEyeSpace,
      lightPosInWorldSpace = this.lightPosInWorldSpace,
      lightPosInModelSpace = this.lightPosInModelSpace,
      modelMatrix = this.modelMatrix,
      viewMatrix = this.viewMatrix;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Do a complete rotation every 10s
    time = Date.now() % 10000;
    angleInDegrees = (360 / 10000) * time;
    angleInRadians = ((angleInDegrees * Math.PI) / 180);

    // Set our per-vertex lighting program.
    gl.useProgram(this.perVertexProgramHandle);

    // Set program handles for cube drawing.
    this.mvpMatrixHandle = gl.getUniformLocation(perVertexProgramHandle,
                                                 "u_MVPMatrix");
    this.mvMatrixHandle = gl.getUniformLocation(perVertexProgramHandle,
                                                "u_MVMatrix");
    this.lightPosHandle = gl.getUniformLocation(perVertexProgramHandle,
                                                "u_LightPos");
    this.positionHandle = gl.getAttribLocation(perVertexProgramHandle,
                                               "a_Position");
    this.colorHandle = gl.getAttribLocation(perVertexProgramHandle,
                                            "a_Color");
    this.normalHandle = gl.getAttribLocation(perVertexProgramHandle,
                                             "a_Normal");

    // Calculate position of the light. Rotate and then push into the distance.
    mat4.identity(lightModelMatrix, 0);
    mat4.translate(lightModelMatrix, lightModelMatrix, [0, 0, -5]);
    mat4.rotate(lightModelMatrix, lightModelMatrix, angleInRadians, [0, 1, 0]);
    mat4.translate(lightModelMatrix, lightModelMatrix, [0, 0, 2]);

    mat4.multiply(lightPosInWorldSpace, lightPosInWorldSpace, lightModelMatrix,
                  lightPosInModelSpace);
    mat4.multiply(lightPosInEyeSpace, lightPosInEyeSpace, viewMatrix,
                  lightPosInWorldSpace);

    // Draw some cubes.
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [4, 0, -7]);
    mat4.rotate(modelMatrix, modelMatrix, angleInRadians, [1, 0, 0]);
    this.drawCube(gl);

    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [-4, 0, -7]);
    mat4.rotate(modelMatrix, modelMatrix, angleInRadians, [0, 1, 0]);
    this.drawCube(gl);

    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0, 4, -7]);
    mat4.rotate(modelMatrix, modelMatrix, angleInRadians, [0, 0, 1]);
    this.drawCube(gl);

    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0, -4, -7]);
    this.drawCube(gl);

    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0, 0, -5]);
    mat4.rotate(modelMatrix, modelMatrix, angleInRadians, [1, 1, 0]);
    this.drawCube(gl);

    // Draw a point to indicate the light.
    gl.useProgram(this.pointProgramHandle);
    this.drawLight(gl);
  };
  Renderer.prototype.drawCube = function (gl) {
    var cubePositions = this.cubePositions,
      cubeNormals = this.cubeNormals,
      cubeColors = this.cubeColors,
      positionHandle = this.positionHandle,
      colorHandle = this.colorHandle,
      normalHandle = this.normalHandle,
      mvpMatrix = this.mvpMatrix,
      viewMatrix = this.viewMatrix,
      modelMatrix = this.modelMatrix,
      lightPosHandle = this.lightPosHandle,
      lightPosInEyeSpace = this.lightPosInEyeSpace;

    // Pass in the position information
    gl.bindBuffer(gl.ARRAY_BUFFER, cubePositions);
    gl.vertexAttribPointer(positionHandle, cubePositions.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(positionHandle);

    // Pass in the color information
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeColors);
    gl.vertexAttribPointer(colorHandle, cubeColors.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(colorHandle);

    // Pass in the normal information
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormals);
    gl.vertexAttribPointer(normalHandle, cubeNormals.itemSize, gl.FLOAT,
                           false, 0, 0);
    gl.enableVertexAttribArray(normalHandle);

    // This multiplies the view matrix by the model matrix, and stores the
    // result in the MVP matrix (which currently contains model * view).
    mat4.multiply(mvpMatrix, viewMatrix, modelMatrix);

    // Pass in the modelview matrix.
    gl.uniformMatrix4fv(this.mvMatrixHandle, false, mvpMatrix);

    // This multiplies the modelview matrix by the projection matrix, and
    // stores the result in the MVP matrix
    // (which now contains model * view * projection).
    mat4.multiply(mvpMatrix, this.projectionMatrix, mvpMatrix);

    // Pass in the combined matrix.
    gl.uniformMatrix4fv(this.mvpMatrixHandle, false, mvpMatrix);

    // Pass in the light position in eye space.
    gl.uniform3f(lightPosHandle, lightPosInEyeSpace[0], lightPosInEyeSpace[1],
                 lightPosInEyeSpace[2]);

    // Draw the cube.
    gl.drawArrays(gl.TRIANGLES, 0, cubePositions.numItems);
  };
  Renderer.prototype.drawLight = function (gl) {
    var pointProgramHandle = this.pointProgramHandle,
      pointMVPMatrixHandle,
      pointPositionHandle,
      lightModelMatrix = this.lightModelMatrix,
      lightPosInModelSpace = this.lightPosInModelSpace,
      viewMatrix = this.viewMatrix,
      mvpMatrix = this.mvpMatrix,
      projectionMatrix = this.projectionMatrix;

    pointMVPMatrixHandle = gl.getUniformLocation(pointProgramHandle,
                                                 "u_MVPMatrix");
    pointPositionHandle = gl.getAttribLocation(pointProgramHandle,
                                               "a_Position");

    // Pass in the position.
    gl.vertexAttrib3f(pointPositionHandle, lightPosInModelSpace[0],
                      lightPosInModelSpace[1], lightPosInModelSpace[2]);

    // Since we are not using a buffer object, disable vertex arrays for this
    // attribute.
    gl.disableVertexAttribArray(pointPositionHandle);

    // Pass in the transformation matrix.
    mat4.multiply(mvpMatrix, viewMatrix, lightModelMatrix);
    mat4.multiply(mvpMatrix, projectionMatrix, mvpMatrix, 0);
    gl.uniformMatrix4fv(pointMVPMatrixHandle, false, mvpMatrix);

    // Draw the point.
    gl.drawArrays(gl.POINTS, 0, 1);
  };
}());
