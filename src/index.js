import Mufawwad from './Mufawwad';
const mufa = new Mufawwad();

export const on = mufa.on;
export const one = mufa.one;
export const sub = mufa.sub;

export const pub = mufa.pub;
export const off = mufa.off;
export const fire = mufa.fire;

export default Mufawwad;
/*

  subId = mufa.sub(event, (data) => callback(data));
  mufa.pub(event, data);
  mufa.unsub(subId);
//--------------
  mufa.on(event, (data) => callback(data));
  mufa.one(event, (data) => callback(data));
  mufa.fire(event, data);
//((((((((((((()))))))))))))
  subscriber => {id, event, callback, attendance:infinite};
  events => {id, event, data}

 */
