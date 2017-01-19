import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Mufa from 'mufa';
import {subscriptions} from './subs';
const mufa = new Mufa();
subscriptions(mufa.on.bind(mufa), mufa.fire.bind(mufa), mufa.one.bind(mufa));
ReactDOM.render(<App mufa={mufa} />, document.getElementById('app'));
