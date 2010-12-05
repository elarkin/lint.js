/*global exports, module, process, require, console */
/*members JSLINT, argv, id, readFileSync, log, forEach */

/* This file should be concatinated onto the end of
 * fulljslint.js from https://github.com/douglascrockford/JSLint */

exports.JSLINT = JSLINT;

if (module.id !== '.') {
	return;
}

var filename, filesource;
filename = process.argv[2]; // node lint.js FILENAME

//TODO: Detect encoding if possible
filesource = require('fs').readFileSync(filename,'utf8');

if(JSLINT(filesource)) {
	console.log('Congratulations! The file checks out!');
} else {
	JSLINT.errors.forEach(function(error) {
		console.log('');
		console.log(error.reason);
		console.log('Line: ' + error.line + '; Character: ' + error.character);
		console.log('Evidence: ' + error.evidence);
	});
}
