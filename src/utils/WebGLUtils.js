export class WebGLUtils {
  constructor(renderer) {
    this.renderer = renderer;
    this.gl = renderer.getContext();
  }

  createBuffer(data, usage = this.gl.STATIC_DRAW) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), usage);
    return buffer;
  }

  updateBuffer(buffer, data, offset = 0) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, offset, new Float32Array(data));
  }
}
