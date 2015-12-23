var browserify = require('browserify'),
	path = require('path'),
	fs = require('fs');

var b = browserify(),
	inStream,
	writeStream,
	codeArr;

b.add(path.join(process.cwd(), 'themes/doc/source/_js/main.js'));

hexo.theme.watch().then(function () {
	codeArr = [];
	hexo.theme.addProcessor('_js/*path', function (file) {
		inStream = b.bundle();
		writeStream = fs.createWriteStream(path.join(process.cwd(), 'themes/doc/source/js/bundle.js'));
		inStream.pipe(writeStream);
	});
});