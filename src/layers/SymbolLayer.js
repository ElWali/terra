import { Expression } from '../core/Expression.js';

export class SymbolLayer {
  constructor({ id, source, layout, paint }) {
    this.id = id;
    this.source = source;
    this.layout = layout;
    this.paint = paint;
  }

  getLayoutProperty(property, feature) {
    return Expression.evaluate(this.layout[property], feature);
  }

  getPaintProperty(property, feature) {
    return Expression.evaluate(this.paint[property], feature);
  }
}
