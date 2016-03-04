/*global describe, it, beforeEach */
'use strict';

import test from 'ava';
import gotZip from './';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import path from 'path';
import fs from 'fs';

const zip = 'https://github.com/ragingwind/got-zip/archive/v0.2.2.zip';
var opts = {
	dest: path.join(__dirname, './.tmp')
};
var filename = path.join(opts.dest, path.basename(zip));

test.beforeEach(function() {
	rimraf.sync(opts.dest);
	mkdirp(opts.dest);
});

test.serial('should download, extact and cleanup a zip', t => {
	return gotZip(zip, opts).then(() => {
		t.ok(!fs.existsSync(filename));
	});
});

test.serial('should exist a zip', t => {
	opts.cleanup = false;

	return gotZip(zip, opts).then(() => {
		t.ok(fs.existsSync(filename));
	});
});

test.serial('should exclude all of the files', t => {
	opts.exclude = [
		'package.json',
		'readme.md'
	];

	return gotZip(zip, opts).then(() => {
		t.ok(!fs.existsSync(path.join(opts.dest, 'package.json')));
		t.ok(!fs.existsSync(path.join(opts.dest, 'readme.md')));
	});
});
