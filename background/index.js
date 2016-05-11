'use strict';
const { ipcRenderer } = require('electron');
const task = require('../shared/task');

window.onload = function () {
	ipcRenderer.on('background-start', (startTime) => {
		ipcRenderer.send('background-response', {
			result: task(),
			startTime: startTime
		});
	});
};
