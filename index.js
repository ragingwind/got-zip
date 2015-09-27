'use strict';

var fs = require('fs');
var path = require('path');
var got = require('got');
var objectAssign = require('object-assign');
var minimatch = require('minimatch');
var DecompressZip = require('decompress-zip');
var Promise = require('pinkie-promise');

function nomatch(file, patterns) {
	patterns = patterns || [];

	var nomatched = patterns.every(function(pattern) {
		return minimatch(file, pattern, {
			dot : true
		}) === false;
	});

	return nomatched;
}

function gotZip(url, opts) {
	return new Promise(function (resolve, reject) {
		opts = objectAssign({
			extract: true,
			cleanup: true,
			exclude: [],
			strip: 0
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
			if (!opts.extract) {
				resolve({
					dest: dest,
					zipfile: zipfile
				});
				return;
			}

			var unzipper = new DecompressZip(zipfile);

			unzipper.on('extract', function() {
				if (opts.cleanup && fs.existsSync(zipfile)) {
					fs.unlinkSync(zipfile);
				}

				resolve({
					dest: dest,
					zipfile: zipfile
				});
			});

			unzipper.on('error', reject);

			var exclude = !opts.exclude ? null : function(file) {
				return nomatch(file.path, opts.exclude);
			};

			unzipper.extract({
				path: dest,
				filter: exclude,
				strip: opts.strip
			});
		});

		got.stream(url, opts).pipe(zipstream);
	});
}

module.exports = gotZip;
