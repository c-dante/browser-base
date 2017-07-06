import './main.scss';
import mainTpl from './main.tpl.pug';
import { genList } from './a';

const elt = document.createElement('div');
elt.innerHTML = mainTpl({
	x: 10,
	y: [1, 2, 3],
	z: 'Words',
	q: genList(),
});

document.querySelector('body').appendChild(elt);
