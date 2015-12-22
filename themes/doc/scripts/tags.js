var site = hexo.locals.get('site');
//hexo.extend.tag.register(
//	{{ tagname }},
//	function (args, content) {
//		return '';
//	}, {
//		//	ends: true,
//		//	async: true
//	});


hexo.extend.tag.register(
	'error',
	function (args, content) {
		return '<p class="post_content_error">' + content + '</p>';
	}, {
		ends: true
	}
);
hexo.extend.tag.register(
	'warn',
	function (args, content) {
		return '<p class="post_content_warn">' + content + '</p>';
	}, {
		ends: true
	}
);

hexo.extend.tag.register(
	'info',
	function (args, content) {
		return '<p class="post_content_info">' + content + '</p>';
	}, {
		ends: true
	}
);