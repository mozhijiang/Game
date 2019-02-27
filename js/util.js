var log = console.log.bind(console);

var $ = document.querySelectorAll.bind(document);

var random = function(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};