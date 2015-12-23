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