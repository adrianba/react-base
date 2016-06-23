import { combineReducers } from 'redux';

const sample = (state = {}, action) => {
	switch(action.type) {
		case 'SAMPLE':
			return Object.assign({}, state, {
				sample: action.sample,
			});

		default:
			return state;
	}
};

export default combineReducers({
	sample
});