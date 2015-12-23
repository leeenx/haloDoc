/*代码高亮*/
var Util = require('./util'),
	prettify = require('./google_code_prettify');

var _apilist,
	_prettify,
	_pre,
	init;
_apilist = document.getElementById('j_apilist');
_pre = document.getElementsByTagName("pre");

init = function () {
	window.addEventListener("load", function () {
		Array.prototype.forEach.call(_pre, function (val) {
			Util.addClass(val, "prettyprint");
			Util.addClass(val, "linenums");
		});
		prettify.prettyPrint();
	});
};
module.exports = {
	init: init
};