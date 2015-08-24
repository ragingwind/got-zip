#!/usr/bin/env node
'use strict';
var meow = require('meow');
var zipGot = require('./');
var objectAssign = require('object-assign');

var cli = meow({
	help: [
		'Usage',
	  '  zip-got <url> <exclude-patterns>... --cleanup --extract',
		'',
	  'Example',
	  '  zip-got http://unicorns.com/unicorns.zip \'__MACOSX/**\' \'bower.json\' \'README.md\' \'LICENSE.md\' --dest=\'./.tmp\' --cleanup --extract',
		'',
	  'Options',
		'--dest: dest path to download a zip file',
		'--cleanup: remove the zip file after extracting',
		'--extract: extract the zip file after downloading',
		'',
		'<url> url of zip file trying to download',
		'<exclude-patterns> pattern to exclude some of the files when it is extracted'
	]
});

var url = cli.input.shift();
var opts = objectAssign({
	exclude: cli.input,
	dest: cli.flags.dest || process.cwd(),
	cleanup: cli.flags.cleanup,
	extract: cli.flags.extract
});

zipGot(url, opts, function(err) {
	if (err) {
		console.error(err);
		return;
	}

	console.log(url, 'has been downloaded');
});
