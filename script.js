class EventTarget {
  constructor() {
    // Map of eventName -> Set of callbacks
    this.listeners = new Map();
  }

  addEventListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    // Set automatically prevents duplicate callbacks
    this.listeners.get(event).add(callback);
  }

  removeEventListener(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);

      // Clean up if no listeners remain
      if (this.listeners.get(event).size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  dispatchEvent(event) {
    if (this.listeners.has(event)) {
      for (const callback of this.listeners.get(event)) {
        callback(); // invoke callback
      }
    }
  }
}
