import { assert } from 'chai';
import { genList } from './a';

describe('a', function() {

	it('should return a specific length array', () => {
		const actual = genList(4);
		assert.equal(actual.length, 5);
	});

});