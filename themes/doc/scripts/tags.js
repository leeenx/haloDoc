/* 注册标签
	hexo.extend.tag.register(
		tagname,
		function (args, content) {
			return '';
		}, {
			ends: true,
			async: true
		});
*/
var author;
author = hexo.config.author;

hexo.extend.tag.register(
	'alert',
	function (args, content) {
		switch (args[0]) {
		case 'error':
			return '<p class="post_content_error">' + content + '</p>';
		case 'warn':
			return '<p class="post_content_warn">' + content + '</p>';
		case 'info':
			return '<p class="post_content_info">' + content + '</p>';
		}

	}, {
		ends: true
	}
);

hexo.extend.tag.register(
	'codepen',
	function (args) {
		if (!args[0]) {
			throw new Error('CodePen ID is not defined. ');
		}
		return '<p data-height="' + (args[1] || 250) + '" data-theme-id="0" data-slug-hash="' + args[0] + '" data-default-tab="result" data-user="' + author + '" class="codepen">See the Pen <a href="http://codepen.io/pen/KVggpQ/">' + args[0] + '</a> by ' + author + ' (<a href="http://codepen.io/' + author + '">@' + author + '</a>) on <a href="http://codepen.io">CodePen</a>.</p><script async src="//assets.codepen.io/assets/embed/ei.js"></script>';
	}
)