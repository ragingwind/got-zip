/*global describe, it, beforeEach */
'use strict';

var assert = require('assert');
var zipGot = require('./');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

describe('zip-got', function () {
	var zip = 'https://github.com/PolymerElements/polymer-starter-kit/releases/download/v1.0.3/polymer-starter-kit-light-1.0.3.zip';
	var opts = {
		dest: './.tmp'
	};
	var filename = path.join(opts.dest, path.basename(zip));

	beforeEach(function() {
		rimraf.sync(opts.dest);
		mkdirp(opts.dest);
	});


	it('should download the file', function (done) {
		zipGot(zip, opts, function(err) {
			if (err) {
				console.error(err);
			}

			assert(!err);
			assert(!fs.existsSync(filename));
			done();
		});
	});

	it('should exist zipfile downloaded', function (done) {
		opts.cleanup = false;

		zipGot(zip, opts, function(err) {
			if (err) {
				console.error(err);
			}

			assert(!err);
			assert(fs.existsSync(filename));
			done();
		});
	});

	it('should exclude all of the files', function (done) {
		opts.exclude = [
			'__MACOSX/**',
			'bower.json',
			'LICENSE.md',
			'README.md'
		];

		zipGot(zip, opts, function(err) {
			if (err) {
				console.error(err);
			}

			assert(!err);
			assert(!fs.existsSync(path.join(opts.dest, '__MACOSX')));
			assert(!fs.existsSync(path.join(opts.dest, 'bower.json')));
			assert(!fs.existsSync(path.join(opts.dest, 'LICENSE.md')));
			assert(!fs.existsSync(path.join(opts.dest, 'README.md')));

			done();
		});
	});
});
