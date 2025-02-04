class Triangle{
    constructor(){
      this.type = 'triangle';
      this.position = [0.0,0.0,0.0];
      this.color = [1.0,1.0,1.0,1.0];
      this.size = 5.0;
    }
    render() {
      var xy = this.position;
      var rgba = this.color;
      var size = this.size;
  
      // Pass the position of a point to a_Position variable
      // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniform1f(u_Size, size);
      // Draw
      var d = this.size/200.0;
      drawTriangle( [xy[0], xy[1], xy[0]+d, xy[1], xy[0], xy[1]+d], this.color);
    }
  }
  function drawTriangle(vertices, color) {
    var n = 3; // The number of vertices
    
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    
    // Bind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // **Ensure color is passed correctly to the shader**
    gl.uniform4f(u_FragColor, color[0], color[1], color[2], color[3]);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}
