var browserify = require('browserify'),
	path = require('path'),
	fs = require('fs');

var b = browserify();
b.add(path.join(process.cwd(), '/themes/doc/source/_js/main.js'));
b.bundle().pipe(fs.createWriteStream(path.join(process.cwd(), '/themes/doc/source/js/bundle.js')));

hexo.theme.watch().then(function () {
	hexo.theme.addProcessor('_js/main.js', function (file) {
		console.log(file.path);
	});
});