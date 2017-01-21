import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Mufa from 'mufa';
import apiMufaConnector from './apiMufaConnector';
const mufa = new Mufa();
apiMufaConnector(mufa.on, mufa.fire, mufa.one);
ReactDOM.render(<App mufa={mufa} />, document.getElementById('app'));
