import { View } from '../src/core/View.js';
import { Stream } from '../src/core/Stream.js';
import { SymbolLayer } from '../src/layers/SymbolLayer.js';

// Mock WebSocket server for demo purposes
const mockStream = {
  subscribe: (callback) => {
    // Simulate aircraft data updates
    setInterval(() => {
      const mockData = {
        type: 'FeatureCollection',
        features: Array.from({ length: 100 }, (_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              Math.random() * 10 - 5,
              Math.random() * 10 - 5
            ]
          },
          properties: {
            type: 'aircraft',
            heading: Math.random() * 360,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            timestamp: Date.now()
          }
        }))
      };
      callback(mockData);
    }, 100);
  }
};

// Create demo view
const view = new View({
  container: 'map',
  layers: [
    new SymbolLayer({
      id: 'aircraft',
      source: mockStream,
      layout: {
        'icon-image': 'aircraft',
        'icon-rotation': ['get', 'heading']
      },
      paint: {
        'icon-color': ['get', 'color'],
        'icon-opacity': ['interpolate', ['linear'], ['age'], 0, 1, 30000, 0.3]
      }
    })
  ]
});
