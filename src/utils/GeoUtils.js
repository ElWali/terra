export class GeoUtils {
  static distance(p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  static bearing(p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    return Math.atan2(y2 - y1, x2 - x1);
  }
}
