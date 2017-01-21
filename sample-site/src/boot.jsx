import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Mufa from 'mufa';
import mufaConnector from './mufaConnector';
const mufa = new Mufa();
mufaConnector(mufa.on, mufa.fire, mufa.one);
ReactDOM.render(<App mufa={mufa} />, document.getElementById('app'));
