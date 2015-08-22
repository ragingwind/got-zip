/*global describe, it, before */
'use strict';

var assert = require('assert');
var zipGot = require('./');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

var tmp = './.tmp';
var zip = 'https://github.com/PolymerElements/polymer-starter-kit/releases/download/v1.0.3/polymer-starter-kit-light-1.0.3.zip';

describe('zip-got', function () {
	before(function() {
		rimraf.sync(tmp);
		mkdirp(tmp);
	});

	var opts = {
		target: path.join(tmp, path.basename(zip))
	};

	// it('should download the file', function (done) {
	// 	zipGot(zip, opts, function(err) {
	// 		if (err) {
	// 			console.error(err);
	// 		}
	//
	// 		assert(!err);
	// 		assert(!fs.existsSync(opts.target));
	// 		done();
	// 	});
	// });
	//
	// it('should exist zipfile downloaded', function (done) {
	// 	opts.cleanup = false;
	//
	// 	zipGot(zip, opts, function(err) {
	// 		if (err) {
	// 			console.error(err);
	// 		}
	//
	// 		assert(!err);
	// 		assert(fs.existsSync(opts.target));
	// 		done();
	// 	});
	// });

	it('should filter all of the files', function (done) {
		opts.filter = [
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
			assert(!fs.existsSync(path.join(tmp, '__MACOSX')));
			assert(!fs.existsSync(path.join(tmp, 'bower.json')));
			assert(!fs.existsSync(path.join(tmp, 'LICENSE.md')));
			assert(!fs.existsSync(path.join(tmp, 'README.md')));

			done();
		});
	});
});
