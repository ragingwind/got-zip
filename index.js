'use strict';

var fs = require('fs');
var path = require('path');
var got = require('got');
var objectAssign = require('object-assign');
var minimatch = require('minimatch');
var DecompressZip = require('decompress-zip');

function nomatch(file, patterns) {
	patterns = patterns || [];

	var nomatched = patterns.every(function(pattern) {
		return minimatch(file, pattern, {
			dot : true
		}) === false;
	});

	return nomatched;
}

function zipGot(url, opts, cb) {
	if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	opts = objectAssign({
		extract: true,
		cleanup: true,
		exclude: [],
	}, opts);

	if (!url) {
		throw new Error('zip-file url required');
	} else if (!opts.dest) {
		throw new Error('dest path required');
	}

	opts.headers = objectAssign({
		'user-agent': 'https://github.com/ragingwind/zip-got'
	}, opts.headers);

	var dest = path.relative(process.cwd(), opts.dest);
	var zipfile = path.join(dest, path.basename(url));
	var zipstream = fs.createWriteStream(zipfile);

	zipstream.on('finish', function() {
		if (opts.extract) {
			var unzipper = new DecompressZip(zipfile);

			unzipper.on('extract', function() {
				if (opts.cleanup && fs.existsSync(zipfile)) {
					fs.unlinkSync(zipfile);
				}

				cb();
			});

			unzipper.on('error', cb);

			var exclude = !opts.exclude ? null : function(file) {
				return nomatch(file.path, opts.exclude);
			};

			unzipper.extract({
				path: dest,
				filter: exclude
			});
		} else {
			cb();
		}
	});

	return got.stream(url, opts).pipe(zipstream);
}

[
	'get'
].forEach(function (el) {
	zipGot[el] = function(url, opts, cb) {
		return zipGot(url, objectAssign({}, opts, {method: el.toUpperCase()}), cb);
	};
});

module.exports = zipGot;
