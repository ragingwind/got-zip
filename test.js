/*global describe, it, beforeEach */
'use strict';

var assert = require('assert');
var gotZip = require('./');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

describe('Got and extract a zip file', function () {
	var zip = 'https://github.com/ragingwind/got-zip/archive/v0.2.2.zip';
	var opts = {
		dest: './.tmp'
	};
	var filename = path.join(opts.dest, path.basename(zip));

	beforeEach(function() {
		rimraf.sync(opts.dest);
		mkdirp(opts.dest);
	});

	it('should download, extact and cleanup a zip', function (done) {
		gotZip(zip, opts).then(function () {
			assert(!fs.existsSync(filename));
			done();
		}).catch(function (err) {
			assert.fail(err);
			done();
		});
	});

	it('should exist a zip', function (done) {
		opts.cleanup = false;

		gotZip(zip, opts).then(function () {
			assert(fs.existsSync(filename));
			done();
		}).catch(function (err) {
			assert.fail(err);
			done();
		});
	});

	it('should exclude all of the files', function (done) {
		opts.exclude = [
			'package.json',
			'readme.md'
		];

		gotZip(zip, opts).then(function () {
			assert(!fs.existsSync(path.join(opts.dest, 'package.json')));
			assert(!fs.existsSync(path.join(opts.dest, 'readme.md')));

			done();
		}).catch(function (err) {
			assert.fail(err);
			done();
		});
	});
});
