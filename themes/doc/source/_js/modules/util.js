/*通用工具*/
module.exports = {
	randomStr: function (len) {
		/*随机字符串生成*/
		var tmp = [],
			n;
		while (len--) {
			n = ~~(26 * Math.random());
			tmp.push(n > 9 ? String.fromCharCode(n + 87) : n);
		}
		return tmp.join('');
	},
	saveFlow: function (func, to) {
		/*函数节流*/
		var lock = false;
		return function () {
			if (!lock) {
				lock = true, func.apply(null, arguments);
				setTimeout(function () {
					lock = false;
				}, to);
			}
		}
	},
	//	getScrollTop: (function () {
	//		/*获取滚动高度*/
	//		return Function('scrollY' in window ? 'return window.scrollY' : 'return document.documentElement.scrollTop');
	//	})(),
	forEach: function (a) {
		return [].forEach.apply(a, Array.prototype.slice.call(arguments, 1));
	},
	data: (function () {
		/*data属性*/
		return document.body.dataset ? function (el, key, val) {
			if (val) {
				el.dataset[key] = val;
				return;
			}
			return el.dataset[key];
		} : function (el, key, val) {
			if (val) {
				el.setAttribute('data-' + key, val);
				return;
			}
			el.getAttribute('data-' + key);
		};
	})(),
	addClass: (function () {
		/*添加类*/
		return document.body.classaList ? function (el, _className) {
			el.classList.add(_className);
		} : function (el, _className) {
			new RegExp('\\b' + _className + '\\b').test(el.className) || (el.className = (el.className + ' ' + _className).replace(/ {2,}/, function () {
				return ' ';
			}).trim());
		};
	})(),
	removeClass: (function () {
		/*移除类*/
		return document.body.classaList ? function (el, _className) {
			el.classList.remove(_className);
		} : function (el, _className) {
			el.className = el.className.replace(new RegExp('\\b' + _className + '\\b'), function () {
				return '';
			}).replace(/ {2,}/, function () {
				return ' ';
			}).trim();
		};
	})(),
	appendScript: function (src, onload) {
		var script = document.createElement('script');
		script.src = src;
		script.onload = onload;
		document.body.appendChild(script);
	}
};