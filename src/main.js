import './main.scss';
import { scaleLinear } from 'd3-scale';

import { patch } from 'incremental-dom';
import { Pythagoras } from './pythagoran';

// Update my-app with mouse stuff
function throttleWithRAF (fn) {
  let running = false
  return function () {
    if (running) return
    running = true
    window.requestAnimationFrame(() => {
      fn.apply(this, arguments)
      running = false
    })
  }
}

const appNode = document.querySelector('.my-app');
const svgNode = appNode.querySelector('svg');

const svgSize = {
	width: 1280,
	height: 600,
};
svgNode.setAttribute('width', svgSize.width);
svgNode.setAttribute('height', svgSize.height);

const scaleFactor = scaleLinear()
	.domain([svgSize.height, 0])
	.range([0, 0.8]);

const scaleLean = scaleLinear()
	.domain([0, svgSize.width / 2, svgSize.width])
	.range([.5, 0, -.5]);

const update = (evt) => {
	const x = evt.clientX;
	const y = evt.clientY;

	const state = {
		currentMax: 0,
		baseW: 80,
		heightFactor: scaleFactor(y),
		lean: scaleLean(x),
	};

	// Calc tree props
	const baseTreeProps = {
		w: state.baseW,
		h: state.baseW,
		heightFactor: state.heightFactor,
		lean: state.lean,
		x: svgSize.width / 2 - 40,
		y: svgSize.height - state.baseW,
		lvl: 0,
		maxlvl: 11,
	};

	patch(svgNode, Pythagoras, baseTreeProps);
};
svgNode.addEventListener('mousemove', throttleWithRAF(update));
