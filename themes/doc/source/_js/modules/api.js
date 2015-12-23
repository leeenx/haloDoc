/*API页面相关*/
var Util = require('./util'),
	CodePrettify = require('./code_prettify.js');

var Category,
	Search,
	Template,
	Changyan,
	init;

Template = function (temp) {
	this.tempStr = temp;
};

Template.prototype.render = function (data) {
	var str = this.tempStr;
	str = str.replace(/{{ *#(\w+?) *}}([\s\S]*?){{ *\/\1 *}}/g, function (m, g1, g2, pos, ori) {
		if (!(g1 in data)) {
			return '';
		}
		var _d = data[g1],
			_t = new Template(g2),
			_a = [];
		if (/array/i.test(Object.prototype.toString.call(_d))) {
			_d.forEach(function (val, idx, arr) {
				_a.push(_t.render(val));
			});
		} else {
			_a.push(_t.render(_d));
		}
		return _a.join('');
	}).replace(/{{ *(\w+?) *}}/g, function (m, g, pos, ori) {
		return data[g];
	});
	return str;
};

Category = (function () {
	var bind,
		init,
		_curr,
		_ctn,
		_height,
		_map,
		_genMap,
		_bind;

	_ctn = document.getElementById('j_api_list');
	_height = _ctn.offsetHeight;
	_map = [];
	_genMap = function () {
		_curr = document.getElementById('j_curr');
		Util.forEach(Array.prototype.slice.call(_curr.getElementsByTagName('a'), 1), function (val) {
			_map[document.getElementById(val.href.split('#')[1]).offsetTop - 20] = val;
			val._offsetTop = val.offsetTop;
		});
	};

	_bind = function () {
		var prev = 0,
			__onScroll,
			_post;
		_post = document.getElementById('j_post');
		_curr.scrollIntoView();
		
		__onScroll = function (evt) {
			var top = _post.scrollTop,
				i = 0,
				sTop = _ctn.scrollTop;
			while (!(top in _map) && top-- && top >= 1) {}
			if (prev in _map && prev != top) {
				_map[prev].style.background = 'none';
			}
			if (top in _map) {
				_map[top].style.background = "#666";
				prev = top;
				if (_map[top]._offsetTop < sTop) {
					_ctn.scrollTop = _map[top]._offsetTop;
				}
				else if (_map[top]._offsetTop > sTop + _height - 30) {
					_ctn.scrollTop = _map[top]._offsetTop + 30 - _height;
				}
			}
		};
		__onScroll();
		_post.addEventListener('scroll', Util.saveFlow(__onScroll, 20));
	};
	init = function () {
		_genMap();
		_bind();
	};

	return {
		init: init
	}
})();

Search = (function () {
	var init,
		_wrapper,
		_searchWrapper,
		_map,
		_genMap,
		_render,
		_bindSearch,
		//		_isModified,
		_template;

	_map = [];
	_wrapper = document.getElementById('j_api');
	_searchWrapper = document.getElementById('j_api_list_search');
	_template = new Template(document.getElementById('j_template').innerHTML);

	//	_isModified = (function () {
	//		var _old = [],
	//			len = 0,
	//			r;
	//		return function (_new) {
	//			if (len == _new.length) {
	//				s = len;
	//				while (len-- && _old[len] == _new[len]) {}
	//				r = len == -1 ? false : true;
	//				_old = _new;
	//				len = _old.length;
	//				return r;
	//			}
	//			_old = _new;
	//			len = _old.length;
	//			return true;
	//		}
	//	})();

	_genMap = function () {
		var listTitle = document.getElementById('j_api_list_normal').getElementsByClassName('api_list_item'),
			tit,
			title,
			_tmp;
		Util.forEach(listTitle, function (parent) {
			title = parent.getElementsByTagName('a');
			tit = title[0].innerHTML;
			Util.forEach(title, function (child, idx) {
				_tmp = {
					href: child.href,
					title: child.innerHTML
				};
				if (idx != 0) {
					_tmp.parent = {
						title: tit
					}
				}
				_map.push(_tmp);
			});
		});
	};

	_search = function (str) {
		try {
			str = str.trim();
			if (str == '') {
				_render();
				return;
			}
			var reg = new RegExp(str, 'i'),
				res = _map.filter(function (val) {
					return reg.test(val.title);
				});
			_render(res, reg);
		} catch (e) {
			_render([]);
		}

	};

	_render = function (map, reg) {
		Util.removeClass(_searchWrapper, 'api_list_search_complete');
		var str = [];
		if (!map) {
			Util.removeClass(_wrapper, 'j_stat_search');
			return;
		}
		if (map.length == 0) {
			_searchWrapper.innerHTML = '<li class="api_list_search_empty">根据相关法律法规和政策, <br>部分搜索结果未予显示。</li>';
			return;
		}
		Util.forEach(map, function (val) {
			var obj = val.parent ? {
				title: val.title.replace(reg, function (m) {
					return '<i>' + m + '</i>';
				}),
				href: val.href,
				parent: val.parent
			} : {
				title: val.title.replace(reg, function (m) {
					return '<i>' + m + '</i>';
				}),
				href: val.href
			};
			str.push(_template.render(obj));
		});
		_searchWrapper.innerHTML = str.join('');
		setTimeout(function () {
			Util.addClass(_searchWrapper, 'api_list_search_complete');
		}, 100);
	};

	_bind = function () {
		var search = document.getElementById('j_api_search_input');
		search.addEventListener('blur', function () {
			setTimeout(function () {
				Util.removeClass(_wrapper, 'j_stat_search');
				search.value = '';
			}, 100);
		});
		search.addEventListener('keyup', function () {
			Util.addClass(_wrapper, 'j_stat_search');
			_search(this.value);
		});
	};

	init = function () {
		_genMap();
		_bind();
	};

	return {
		init: init
	}
})();

Changyan = {
	init: function () {
		var tmp = document.createElement('div');
		tmp.id = "SOHUCS";
		document.getElementById('j_post').appendChild(tmp);
		window.addEventListener('load', function () {
			Util.appendScript(
				'http://changyan.sohu.com/upload/changyan.js',
				function () {
					window.changyan.api.config({
						appid: 'cys9bVBfr',
						conf: 'prod_00e3275fbf265a42aa1288efaf3cdeb8'
					});
				});
		});
	}
};

init = function () {
	CodePrettify.init();
	Category.init();
	Search.init();
	if (hexo.theme.Changyan) {
		Changyan.init();
	}
};

module.exports = {
	init: init
};