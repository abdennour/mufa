import Registry from './Registry';
import {Autobind} from 'babel-autobind';

/**
 * المُفَوّض  or The **MUFA**wwad is the engine of this library.
 *  it handles  creation of Mufa instances.
 *  @class Mufa
 *  @type {Mufawwad}
 *  @property {Registry} registry The store
 *
 *  @author Abdennour <http://abdennoor.com>
 *
 * @example
 * import {on, fire} from 'mufa';
 * // publish
 * setTimeout(() => {
 *   fire('sendEmoji', '👏')
 * }, 1000)  ;
 * // subscribe
 * on('sendEmoji', (emoji) => console.log(emoji));

 */
class Mufawwad {

  registry = new Registry();

  /**
   * Subscribe to event and save the callback to be running when the event is published (fired)
   * @method sub
   * @memberof Mufa
   * @param  {String}   event        event name
   * @param  {Function} callback     callback to be running when the event is published
   * @param  {Boolean}  [once=false] it restricts subscriber's notification only for the 1ˢᵗ publish
   * @return {Subscription}                Subscription's info
   *
   */
  sub(event, callback, once = false) {
    return this.registry.insert('subscriber', {
      event,
      callback,
      once
    });
  }

  /**
   * Publish (fire) an event & notify event's subscribers immediatly
   * @method pub
   * @memberof Mufa
   * @param  {String}    event  The event name
   * @param  {*}         data   message(s) to be sent to subscribers
   * @return {undefined}
   */
  pub(event, ...data) {
    const subsToRemove = [];
    this.registry.find(
      'subscriber',
      ((record) => record.event === event)
    ).forEach((record) => {
      if (typeof record.callback === 'function')
        record.callback(...data);
      if (record.once)
        subsToRemove.push(record.id);
    });

    if (subsToRemove.length)
      subsToRemove.forEach(id =>
        this.registry.remove('subscriber', (record) => record.id === id)
      )

  }

  /**
   * Cancel the subscription which was done with "sub" or "one" or "once"
   * @method unsub
   * @memberof Mufa
   * @param  {Subscription} subscriptions One subscription for each argument
   * @return {Array<Subscription>}               arguments
   */
   unsub(...subscriptions) {
    subscriptions.forEach(({id}) => {
      this.registry.remove('subscriber', (record => record.id === id ));
    });
    return subscriptions;
  }

  /**
   * Subscribe to event and save the callback to be running when the event is published (fired).
   *
   * It is an alias of [mufa.sub](#Mufasub)
   * @method on
   * @param  {String}   event        event name
   * @param  {Function} callback     callback to be running when the event is published
   * @return {Subscription}                Subscription's info
   *
   */
  on() {
    return this.sub(...arguments);
  }

  /**
   * Subscribe once to event and save the callback to be running when the event is published (fired)
   *
   * It is almost an alias of [mufa.sub](#Mufasub).
   * @method one
   *
   * @param  {String}   event        event name
   * @param  {Function} callback     callback to be running when the event is published
   * @return {Subscription}                Subscription's info
   *
   */
  one() {
    return this.sub(...arguments, true);
  }

  /**
   * Publish (fire) an event & notify event's subscribers immediatly.
   *
   * It is an alias of [mufa.pub](#Mufapub)
   * @method fire
   * @param  {String}    event  The event name
   * @param  {*}         data   message(s) to be sent to subscribers
   * @return {undefined}
   */
  fire() {
    return this.pub(...arguments);
  }

  /**
   * Cancel the subscription which was done with "sub" or "one" or "once"
   * It is an alias of [mufa.unsub](#Mufaunsub).
   * @method off
   * @param  {Subscription} subscriptions One subscription for each argument
   * @return {Array<Subscription>}               arguments
   */
  off() {
    return this.unsub(...arguments);
  }

}

/**
 *
 * @typedef {Object} Subscription
 * @property {String} id The ID of subscription
 * @property {String} event The event name of subscription
 * @property {Function} callback The action to do when the event is fired
 *
 */

export default Autobind(Mufawwad);
