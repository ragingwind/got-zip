#!/usr/bin/env node
'use strict';
var meow = require('meow');
var zipGot = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ zip-got [input]',
		'',
		'Examples',
		'  $ zip-got',
		'  unicorns & rainbows',
		'',
		'  $ zip-got ponies',
		'  ponies & rainbows',
		'',
		'Options',
		'  --foo  Lorem ipsum. Default: false'
	]
});

console.log(zipGot(cli.input[0] || 'unicorns'));
