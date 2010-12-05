/*global exports, module, process, require, console */
/*members JSLINT, argv, id, readFileSync, log, forEach, parse */

/* This file should be concatinated onto the end of
 * fulljslint.js from https://github.com/douglascrockford/JSLint */

exports.JSLINT = JSLINT;

if (module.id !== '.') {
	return;
}

var filename, filesource, optionsfile, options;
filename = process.argv[2]; // node lint.js FILENAME.js OPTIONSFILE.json
optionsfile = process.argv[3];

//TODO: Detect encoding if possible
filesource = require('fs').readFileSync(filename, 'utf8');
if (optionsfile) {
	options = JSON.parse(require('fs').readFileSync(optionsfile, 'utf8'));
} else {
	options = undefined;
}

if (JSLINT(filesource, options)) {
	console.log('Congratulations! The file checks out!');
} else {
	JSLINT.errors.forEach(function (error) {
		console.log('');
		console.log(error.reason);
		console.log('Line: ' + error.line + '; Character: ' + error.character);
		console.log('Evidence: ' + error.evidence);
	});
}
