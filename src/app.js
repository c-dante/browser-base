import './app.scss';
import angular from 'angular';

// Declare our application
const APP_MODULE = 'my-app';
const app = angular.module(APP_MODULE, [])
	.config([() => {
		console.debug('angular.config', 'Configure providers / factories /etc');
	}])
	.run([() => {
		console.debug('angular.run', 'Bootstrap runtime modules like redux or a router');
	}]);

// Define app components
import { MainController } from './mainComponent/main';
import mainTpl from './mainComponent/main.tpl.pug';
app.component('main', {
	template: mainTpl,
	controller: [MainController],
	controllerAs: '$ctrl',
});

// When we have the document, bootstrap our application
angular.element(document).ready(() => {
	angular.bootstrap(document, [APP_MODULE]);
});
