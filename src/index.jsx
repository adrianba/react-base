import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducers/index.jsx';
import TheApp from './containers/app.jsx';
import { sample } from './actions/actions.jsx';
//import Perf from 'react-addons-perf';
//window.Perf = Perf;

let store = createStore(
	reducer,
	applyMiddleware(
		reduxThunk
	)
);

let app = <Provider store={store}><TheApp /></Provider>;

ReactDOM.render(app, document.getElementById('app'));
store.dispatch(sample());