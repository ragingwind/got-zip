#!/usr/bin/env node
'use strict';
var meow = require('meow');
var gotZip = require('./');
var objectAssign = require('object-assign');

var cli = meow({
	help: [
		'Usage',
		'  got-zip <url> <exclude-patterns>... --cleanup --extract',
		'',
		'Example',
		'  got-zip http://unicorns.com/unicorns.zip \'__MACOSX/**\' \'bower.json\' \'README.md\' \'LICENSE.md\' --dest=\'./.tmp\' --cleanup --extract',
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
	dest: process.cwd()
}, cli.flags);

gotZip(url, opts, function (err) {
	if (err) {
		console.error(err);
		return;
	}

	console.log(url, 'has been downloaded');
});
