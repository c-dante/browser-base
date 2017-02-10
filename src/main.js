import './main.scss';
import mainTpl from './main.tpl.pug';

document.querySelector('body').innerHTML = mainTpl({
	x: 10,
	y: [1, 2, 3],
	z: 'Words'
});
