import { View } from './core/View.js';
import { Stream } from './core/Stream.js';
import { SymbolLayer } from './layers/SymbolLayer.js';

// Example usage
const aircraftStream = new Stream({
  url: 'wss://example.com/aircraft',
  format: 'geojson-sequence'
});

const view = new View({
  container: 'map',
  layers: [
    new SymbolLayer({
      id: 'aircraft',
      source: aircraftStream,
      layout: {
        'icon-image': ['get', 'type'],
        'icon-rotation': ['get', 'heading']
      },
      paint: {
        'icon-color': ['get', 'color'],
        'icon-opacity': ['interpolate', ['linear'], ['age'], 0, 1, 30000, 0.3]
      }
    })
  ]
});
