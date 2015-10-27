'use strict';

// This module is instantiated twice. Once in the background process and once in the renderer process. They can't
// share data other than through IPC.

module.exports = function task() {
	let result = 0;

	for (let i = 0; i < 100000000; i++) {
		result += i;
	}

	return result;
};
