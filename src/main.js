import env from 'environment';
import './main.scss';

if (env.logging) {
	console.debug('Hello world', env);
}

