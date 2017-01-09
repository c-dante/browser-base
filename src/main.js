import './main.scss';
import 'webcomponents.js';

import { patch } from 'incremental-dom';
import { compile } from './pug-inc';

import appTpl from './app.tpl.pug';

const renderAppDom = compile(appTpl);

class App extends HTMLElement {
	constructor() {
		super();

		// Base state
		this.svg = {
			width: 1280,
			height: 600,
		};

		this.state = {
			currentMax: 0,
			baseW: 80,
			heightFactor: 0,
			lean: 0,
		};

		// Calc tree props
		const baseTreeProps = {
			w: this.state.baseW,
			h: this.state.baseW,
			heightFactor: this.state.heightFactor,
			lean: this.state.lean,
			x: this.svg.width / 2 - 40,
			y: this.svg.height - this.state.baseW,
			lvl: 0,
			maxLvl: this.state.currentMax,
		};

		// Render props
		const props = {
			baseTreeProps,
			svgProps: this.svg,
		};

		// Do render
		patch(this, renderAppDom, props);
	}
}

customElements.define('my-app', App);
