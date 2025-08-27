export class Expression {
  static evaluate(expr, feature) {
    if (!Array.isArray(expr)) return expr;

    const [op, ...args] = expr;

    switch (op) {
      case 'get':
        return feature.properties[args[0]];
      case 'interpolate':
        return this.interpolate(args, feature);
      case 'age':
        return Date.now() - feature.properties.timestamp;
      default:
        console.warn(`Unknown expression operator: ${op}`);
        return null;
    }
  }

  static interpolate([type, input, ...stops], feature) {
    const value = this.evaluate(input, feature);
    for (let i = 0; i < stops.length; i += 2) {
      if (value <= stops[i]) {
        return stops[i + 1];
      }
    }
    return stops[stops.length - 1];
  }
}
