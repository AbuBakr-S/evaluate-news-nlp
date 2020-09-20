function charCountUpdate () {
	let formText = document.getElementById('analyse-text').value;
	let length = formText.length;
	let displayCount = document.getElementById('char-count');

	displayCount.innerHTML = length + ' out of 500 characters';
}

export { charCountUpdate }