'use strict';
const ipc = require('ipc');
const task = require('../shared/task');

window.onload = function () {
	ipc.on('background-start', (startTime) => {
		ipc.send('background-response', {
			result: task(),
			startTime: startTime
		});
	});
};
