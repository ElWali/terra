export class Stream {
  constructor({ url, format }) {
    this.url = url;
    this.format = format;
    this.id = `stream-${Math.random().toString(36).substring(2, 9)}`;
    this.subscribers = [];
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = (event) => {
      const data = this.parse(event.data);
      this.notifySubscribers(data);
    };
  }

  parse(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to parse stream data:', e);
      return null;
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notifySubscribers(data) {
    this.subscribers.forEach(cb => cb(data));
  }
}
