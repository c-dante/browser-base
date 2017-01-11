import { patch } from 'incremental-dom';
import { elementOpen, elementClose, elementVoid } from './pug-inc';
import { interpolateViridis } from 'd3-scale';

const piConst = Math.PI / 180;
const toDeg = (val) => val / piConst;

const memoizedCalc = function () {
	const memo = {};

	const key = ({ w, heightFactor, lean }) => [w,heightFactor, lean].join('-');

	return (args) => {
		const memoKey = key(args);

		if (memo[memoKey]) {
			return memo[memoKey];
		} else {
			const { w, heightFactor, lean } = args;

			const trigH = heightFactor*w;
			const squareH = trigH * trigH;

			const result = {
				nextRight: Math.sqrt(squareH + Math.pow(w * (.5+lean), 2)),
				nextLeft: Math.sqrt(squareH + Math.pow(w * (.5-lean), 2)),
				A: toDeg(Math.atan(trigH / ((.5-lean) * w))),
				B: toDeg(Math.atan(trigH / ((.5+lean) * w)))
			};

			memo[memoKey] = result;
			return result;
		}
	};
}();

export const Pythagoras = ({ w,x, y, heightFactor, lean, left, right, lvl, maxlvl }) => {
	if (lvl >= maxlvl || w < 1) {
		return null;
	}

	const { nextRight, nextLeft, A, B } = memoizedCalc({
		w,
		heightFactor,
		lean,
	});

	let rotate = '';

	if (left) {
		rotate = `rotate(${-A} 0 ${w})`;
	} else if (right) {
		rotate = `rotate(${B} ${w} ${w})`;
	}

	const gProps = ['transform', `translate(${x} ${y}) ${rotate}`];
	const rectProps = [
		'width', w,
		'height', w,
		'style', `fill: ${interpolateViridis(lvl/maxlvl)}`
	];

	const nextLeftProps = {
		w: nextLeft,
		x: 0,
		y: -nextLeft,
		lvl: lvl + 1,
		maxlvl,
		heightFactor,
		lean,
		left: true
	};

	const nextRightProps = {
		w: nextRight,
		x: w - nextRight,
		y: -nextRight,
		lvl: lvl + 1,
		maxlvl,
		heightFactor,
		lean,
		right: true
	};

	elementOpen('g', undefined, [], gProps);
	elementVoid('rect', undefined, ['x', 0, 'y', 0], rectProps);

	Pythagoras(nextLeftProps);
	Pythagoras(nextRightProps);

	elementClose('g');
};
