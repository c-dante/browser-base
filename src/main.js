import './main.scss';
import R from 'ramda';
import lexer from 'pug-lexer';
import parser from 'pug-parser';
import tpl from './tpl.pug';
import immutable from 'object-path-immutable';

import idom from 'incremental-dom';
const fixIdom = fn => (tagname, key, staticProp, rest) =>
	fn.apply(undefined, [tagname, key, staticProp].concat(rest));
const elementOpen = fixIdom(idom.elementOpen);
const elementClose = idom.elementClose;
const elementVoid = fixIdom(idom.elementVoid);
const text = (str, formatters = []) => idom.text.apply(undefined, [str].concat(formatters));

/**
 * elementOpen(tagname, tracking key, static propValArr, propValArr)
 * elementVoid(tagname, tracking key, static propValArr, propValArr)
 * elementClose(tagname)
 * text(text)
 */

const PugNodeType = {
	Block: 'Block',
	Tag: 'Tag',
	Text: 'Text',
	Code: 'Code',
};

const parseAttrs = (attrs) => {
	const out = [];
	// const events = [];
	const [
		classes,
	] = R.partition(x => x.name === 'class', attrs);

	if (classes.length) {
		out.push('class', classes.join(' '));
	}

	// if (rest.length) {
	// 	// console.debug(rest);
	// }

	return out;
};

// @todo: we can push these calls into a list
// @todo: and we can develop smart inc-dom...
const render = ({ ast, props }) =>
	// @todo: this can be so optimized.
	// @todo: static parts of the tree can stay fine
	// @todo: determine where my code goes to generate a sexy idom loop
	(function recurse(node, parent) {
		switch (node.type) {
			case PugNodeType.Block:
				node.nodes.map(x => recurse(x, node));
				break;

			case PugNodeType.Tag: {
				// @todo: this better
				const attrs = parseAttrs(node.attrs, node, parent);
				const args = [node.name, undefined, [], attrs];

				if (node.selfClosing) {
					elementVoid.apply(undefined, args);
					break;
				}

				elementOpen.apply(undefined, args);
				if (node.block) {
					node.block.nodes.map(x => recurse(x, node));
				}
				elementClose(node.name);
			}
				break;

			case PugNodeType.Text:
				text(node.val);
				break;

			case PugNodeType.Code:
				// @todo: this is one of the only times we depend on props...
				// @todo: only paths for now?
				if (parent.type === PugNodeType.Tag) {
					// Interpret as interpolated text
					const path = node.val.split('.');
					text(R.path(path, props));
				}
				break;

			default:
				console.debug('Walking: ', node, 'from', parent);
				console.error('unhandled.');
		}
	}(ast, undefined));

const root = document.createElement('root');

document.body.appendChild(root);

const state = {
	name: 'Frank',
	time: Date.now(),
	input: (...args) => {
		console.debug('Input', args);
	},
};

const tokens = lexer(tpl);
const component = parser(tokens);
setInterval(() => {
	const newState = immutable(state)
		.set('time', Date.now())
		.value();

	idom.patch(root, render, {
		component,
		props: newState,
	});
});
