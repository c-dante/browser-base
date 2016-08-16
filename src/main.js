import './main.scss';

const loading = document.querySelector('.content-loading');
loading.classList.add('hidden');

import angular from 'angular';
import ngRedux from 'ng-redux';
import ReduxThunk from 'redux-thunk';

const rootReducer = (state = {}, action) => {
	console.debug('State', state, 'Action', action);
	return state;
};


const app = angular.module('life-events', [ngRedux])
	.config(['$ngReduxProvider', ($ngReduxProvider) => {
		$ngReduxProvider.createStoreWith(
			rootReducer,
			[
				ReduxThunk
			]
		);
	}]);





class EventFormComponent {
	constructor($ngRedux) {
		console.debug('Hey, you', $ngRedux.getState());
	}
}


import eventFormTpl from './eventForm.tpl.jade';
app.component('eventForm', {
	template: eventFormTpl,
	controller: ['$ngRedux', EventFormComponent]
});

