/*特有代码*/
if (hexo.path.startsWith('api')) {
	var API = require('./modules/api.js');
	API.init();
}
else {
	var IDX = require('./modules/idx.js');
	IDX.init();
	IDX.start();
}