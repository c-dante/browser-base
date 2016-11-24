/**
 * Merge assets into bin
 */
var merge = require('merge-dirs').default;

merge('./assets', './bin', 'ask');

console.log('Assets merged');
