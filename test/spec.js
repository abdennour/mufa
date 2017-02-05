import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';

import Mufa,{on, fire} from '../src';
import Registry from '../src/Registry';

describe(`Registry`, () => {
  let registry;
  beforeEach(() => {
    registry= new Registry();
  });

  it(`has id starts and ends with underscore`, () => {
    expect(registry.id).toMatch(/^_.*_$/);
   });
  it(`save records`, () => {
      const lengthBefore = registry.length;
      registry.insert('balbal', {a:3, b:4});
      expect(registry.length).toEqual(lengthBefore+1);
  });

  it(`finds records` , () => {

    registry.insert('t1', {aa:4, bb:5})
    registry.insert('t1', {aa:9, bb:5})
    registry.insert('t1', {aa:9, bb:33})
    registry.insert('t2', {aa:4, bb:8})
    registry.insert('t2', {aa:4, bb:8})
    expect(registry.find('t1',  (record) =>record.bb === 5).length).toEqual(2);
    expect(registry.find('t1').length).toEqual(3);
  });

  it(`removes records`, () => {
    expect(registry.length).toEqual(0);
    registry.insert('t1', {aa:4, bb:5});
    const toDel = registry.insert('t1', {aa:199, bb:90});
    expect(registry.length).toEqual(2);
    registry.remove('t1', (record) => record.aa === 199);
    expect(registry.find('t1', (record) => record.id == toDel.id ).length).toEqual(0);
  });
  it(`clears the whole table`, () => {
    expect(registry.length).toEqual(0);
    registry.insert('t1', {aa:4, bb:5});
    registry.insert('t1', {aa:4, bb:5});
    registry.insert('t1', {aa:4, bb:5});
    expect(registry.length).toEqual(3);
    registry.remove('t1');
    expect(registry.find('t1').length).toEqual(0);
    expect(registry.length).toEqual(0);
  });
});

describe('Mufa', () => {
  let ClassA, ClassB,mufa;
  beforeEach(() => {
    mufa = new Mufa();
    ClassA = (() => {
      class _ {
        getUsers() {
            mufa.pub('onGetUsersStart', {start: Date.now()});
            setTimeout(() => {
              mufa.pub('onGetUsersCompleted', {end: Date.now()})
            }, 1);
         }
      }
      return _;
    })();

   ClassB =(() => {
      class _ {
        pageTitle = "Class B";
        init() {

          mufa.sub('onGetUsersCompleted', ({end})=>{
            console.log(`-->><<>> `, this.pageTitle, 'is loaded at' , new Date(end) )
          });
        }
      }
      return _;
   })();
  });

  it(`implements sub(on)/pub(fire) pattern`, () => {
     const callback = sinon.spy();
     mufa.on('sendEmoji', callback);
     mufa.fire('sendEmoji', '👏');
     expect(callback.withArgs('👏').calledOnce).toBeTruthy();

     mufa.fire('sendEmoji', '♻️');
     expect(callback.calledTwice).toBeTruthy();

  });

  it(`restricts only one subscription when listening with "one" method`, () => {
    const callback = sinon.spy();
    mufa.one('sendEmoji', callback);
    mufa.fire('sendEmoji', '👏');
    expect(callback.withArgs('👏').calledOnce).toBeTruthy();
    mufa.fire('sendEmoji', '💡');
    expect(callback.calledTwice).toBeFalsy();
    expect(callback.calledOnce).toBeTruthy();

  });

  it(`shows a case of sub/pub pattern`, () => {
      new ClassB().init();
      new ClassA().getUsers();
      expect(true).toBeTruthy();

  });

  it(`supports multiple messages `, () => {
    const messages = [ '⚛', '🎙', '🕗', '📚'];
    const callback = sinon.spy();
    mufa.on('sendEmojis', callback);
    mufa.fire('sendEmojis', ...messages);
    expect(callback.withArgs(...messages).calledOnce).toBeTruthy();

  });

  it(`unsubscribes`, () => {
    const callback = sinon.spy();
    const subscription= mufa.on('sendEmojis', callback);
    mufa.fire('sendEmojis');
    expect(callback.callCount).toEqual(1);
    mufa.fire('sendEmojis');
    expect(callback.callCount).toEqual(2);
    mufa.off(subscription);
    mufa.fire('sendEmojis');
    expect(callback.callCount).toEqual(2);

  });

  it(`unsubscribes multiple subscriptions in the same transaction`, () => {
    const callbackA = sinon.spy(),
    callbackB = sinon.spy(),
    subscriptionA= mufa.on('sendEmojis', callbackA),
    subscriptionB= mufa.on('sendEmojis', callbackB);
    mufa.off(subscriptionA, subscriptionB);
    mufa.fire('sendEmojis');
    mufa.fire('sendEmojis');
    expect(callbackA.callCount + callbackB.callCount).toEqual(0);

  });

   it(`allows to access global mufa without need of instantiate one`, () => {
     const spier= sinon.spy();
     on('send', (data) => spier(data));
     fire('send', 'xxx');
     expect(spier.withArgs('xxx').calledOnce).toBeTruthy();

      const otherImport= require('../src');
      otherImport.fire('send', 'yyy');
      expect(spier.calledTwice).toBeTruthy();

      otherImport.on('do', (...args)=> spier(...args));
      fire('do');
      expect(spier.calledThrice).toBeTruthy();


   });

});
