import Registry from './Registry';

class Mufawwad {
  registry = new Registry();

  sub(event, callback, once = false) {
    return this.registry.insert('subscriber', {
      event,
      callback,
      once
    });
  }

  on() {
    return this.sub(...arguments);
  }

  one() {
    return this.sub(...arguments, true);
  }

  pub(event, data) {
    const subsToRemove = [];
    this.registry.find(
      'subscriber',
      ((record) => record.event === event)
    ).forEach((record) => {
      if (typeof record.callback === 'function')
        record.callback(data);
      if (record.once)
        subsToRemove.push(record.id);
    });

    if (subsToRemove.length)
      subsToRemove.forEach(id =>
        this.registry.remove('subscriber', (record) => record.id === id )
       )



  }

  fire() {
    return this.pub(...arguments);
  }


}

export default Mufawwad;
