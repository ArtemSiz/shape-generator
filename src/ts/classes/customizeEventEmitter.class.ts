class CustomizeEventEmitter {
  events: any;

  constructor() {
    this.events = {};
  }

  emit(eventName: string, data: object) {
    const event: any = this.events[eventName];
    if (event) {
      event.forEach((fn: Function) => {
        fn.call(null, data);
      });
    }
  }

  subscribe(eventName: string, fn: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn: Function) => fn !== eventFn);
    };
  }
}

const EventEmitter = new CustomizeEventEmitter();
export default EventEmitter;
