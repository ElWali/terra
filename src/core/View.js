import { Renderer } from './Renderer.js';

export class View {
  constructor({ container, layers }) {
    this.container = document.getElementById(container);
    this.layers = layers || [];
    this.renderer = new Renderer(this.container);

    this.initLayers();
  }

  initLayers() {
    this.layers.forEach(layer => {
      this.renderer.addLayer(layer);
      if (layer.source) {
        layer.source.subscribe(data => {
          this.renderer.updateLayer(layer.id, data);
        });
      }
    });
  }

  addLayer(layer) {
    this.layers.push(layer);
    this.renderer.addLayer(layer);
  }
}
