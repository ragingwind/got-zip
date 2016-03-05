/*global describe, it, beforeEach */
'use strict';

import test from 'ava';
import gotZip from './';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import path from 'path';
import fs from 'fs';

const zip = 'https://github.com/ragingwind/got-zip/archive/v0.2.2.zip';
const opts = {
	dest: path.join(__dirname, './.tmp')
};
const existsSync = function (filename) {
	return fs.existsSync(path.join(opts.dest, filename));
}

test.beforeEach(function () {
	rimraf.sync(opts.dest);
	mkdirp(opts.dest);
});

test.serial('should download, extact and cleanup a zip', t => {
	return gotZip(zip, opts).then(() => {
		t.ok(!existsSync(path.basename(zip)));
	});
});

test.serial('should exist a zip', t => {
	opts.cleanup = false;

	return gotZip(zip, opts).then(() => {
		t.ok(existsSync(path.basename(zip)));
	});
});

test.serial('should exclude all of the files', t => {
	opts.exclude = [
		'package.json',
		'readme.md'
	];

	return gotZip(zip, opts).then(() => {
		t.ok(!existsSync('package.json'));
		t.ok(!existsSync('readme.md'));
	});
});
