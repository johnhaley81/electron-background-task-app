'use strict';
const { ipcRenderer } = require('electron');
const task = require('../shared/task');

window.onload = function () {
	setInterval(() => {
		const progressBar = document.getElementById('progress-bar');
		const maxValue = parseInt(progressBar.getAttribute('max'), 10);
		let nextValue = parseInt(progressBar.getAttribute('value'), 10) + 1;

		if (nextValue > maxValue) {
			nextValue = 0;
		}

		progressBar.setAttribute('value', nextValue);
	}, 25);

	function startProcess() {
		document.getElementById('status').textContent = 'Started!';
	}

	function finishProcess(result, timeElapsed) {
		document.getElementById('status').textContent =
			'Finished with a result of: ' +
			result +
			' in ' +
			(timeElapsed / 1000) +
			' seconds';
	}

	const rendererButton = document.getElementById('in-renderer');

	rendererButton.onclick = function longRunningRendererTask() {
		const startTime = new Date();

		// Note that the UI won't update with this call since we're stuck in a JavaScript process and the UI is
		// unresponsive until this loop finishes. The div will go straight to finished.
		startProcess();

		finishProcess(task(), new Date() - startTime);
	};

	const backgroundButton = document.getElementById('in-background');

	backgroundButton.onclick = function longRunningBackgroundTask() {
		// We have to cast to a number because crossing the IPC boundary will convert the Date object to an empty object.
		// Error, Date and native objects won't be able to be passed around via IPC.
		const backgroundStartTime = +new Date();

		startProcess();
		ipcRenderer.send('background-start', backgroundStartTime);
	}

	ipcRenderer.on('background-response', (event, payload) => {
		finishProcess(payload.result, new Date() - payload.startTime);
	});
};
