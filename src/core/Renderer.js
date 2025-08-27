import * as THREE from 'three';
import { WebGLUtils } from '../utils/WebGLUtils.js';

export class Renderer {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    this.layers = new Map();
    this.webglUtils = new WebGLUtils(this.renderer);

    this.setupCamera();
    this.animate();
  }

  setupCamera() {
    this.camera.position.z = 5;
  }

  addLayer(layer) {
    this.layers.set(layer.id, {
      type: layer.type,
      data: null,
      mesh: null
    });
  }

  updateLayer(layerId, data) {
    const layer = this.layers.get(layerId);
    if (!layer) return;

    // In a real implementation, this would use diffing
    if (layer.mesh) {
      this.scene.remove(layer.mesh);
    }

    layer.data = data;
    layer.mesh = this.createLayerMesh(layer, data);
    this.scene.add(layer.mesh);
  }

  createLayerMesh(layer, data) {
    // Simplified - would use proper WebGL diffing in production
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    data.features.forEach(feature => {
      const [x, y] = feature.geometry.coordinates;
      positions.push(x, y, 0);
      colors.push(...this.hexToRgb(feature.properties.color || '#ff0000'));
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true
    });

    return new THREE.Points(geometry, material);
  }

  hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
