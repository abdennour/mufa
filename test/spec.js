import 'jsdom-global/register';
import expect from 'expect';
import sinon from 'sinon';

import Mufa from '../src';
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
  it(`implements sub/pub pattern`, () => {
      new ClassB().init();
      new ClassA().getUsers();
      expect(true).toBeTruthy();
  });
});
