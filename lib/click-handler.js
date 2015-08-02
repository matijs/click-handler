(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	}
	else if (typeof exports === 'object') {
		module.exports = factory();
	}
	else {
		root.clickHandler = factory();
	}
}(this, function() {
	'use strict';

	var handlers = {};
	var config = {
		alwaysPreventDefault: false,
		maxTraverse: 2
	};

	function isInteractiveElement(el) {
		var nodeName = el.nodeName.toLowerCase();
		if (['a', 'button', 'details', 'embed', 'iframe', 'keygen', 'label', 'select', 'textarea'].indexOf(nodeName) > -1) {
			return true;
		}
		if (nodeName === 'input' && el.type !== 'hidden') {
			return true;
		}
		if (['audio', 'video'].indexOf(nodeName) > -1 && el.hasAttribute('controls')) {
			return true;
		}
		if (['img', 'object'].indexOf(nodeName) > -1 && el.hasAttribute('usemap')) {
			return true;
		}
		return false;
	}

	// are we cutting the mustard?
	if (typeof document === 'undefined' || typeof document.addEventListener === 'undefined') {
		return;
	}

	document.addEventListener('click', function(e) {
		var target = e.target;
		var handlerNames;
		var traversed = 0;

		// traverse up the DOM until we find a data-handler attribute
		while (traversed < config.maxTraverse && target && !handlerNames) {
			handlerNames = target.getAttribute('data-handler');
			if (!handlerNames) {
				target = target.parentElement;
				traversed++;
			}
		}

		// bail if no data-handler attribute was found
		if (!handlerNames) {
			return;
		}

		// bail if the data-handler was on a non-interactive element, yay PE!
		if (!isInteractiveElement(target)) {
			return;
		}

		// allow cmd/ctrl + click and shift + click on anchors for new tab/window
		if (target.nodeName.toLowerCase() === 'a' && (event.shiftKey || event.metaKey || event.ctrlKey)) {
			return true;
		}

		// fire the handlers, passing `target` as `this`.
		handlerNames.split(/\s+/).forEach(function(handlerName) {
			if (typeof handlers[handlerName] === 'function') {
				if (config.alwaysPreventDefault === true) {
					event.preventDefault();
				}
				handlers[handlerName].call(target, event);
			}
		});
	});

	var configure = function(arg) {
		if (!arg) {
			return;
		}
		config.alwaysPreventDefault = arg.alwaysPreventDefault || config.alwaysPreventDefault;
		config.maxTraverse = arg.maxTraverse || config.maxTraverse;
	};

	var register = function(arg, fn) {
		var fnName;
		if (typeof arg === 'string' && typeof fn === 'function') {
			if (!handlers[arg]) {
				handlers[arg] = fn;
			}
		}
		else if (typeof arg === 'object' && typeof fn === 'undefined') {
			for (fnName in arg) {
				register(fnName, arg[fnName]);
			}
		}
	};

	var unregister = function(arg) {
		var fnName;
		if (arguments.length === 1) {
			if (typeof arg === 'string' && handlers[arg]) {
				delete(handlers[arg]);
			}
		}
		else if (arguments.length > 1) {
			for (fnName in arguments) {
				unregister(arguments[fnName]);
			}
		}
	};

	return {
		configure: configure,
		register: register,
		unregister: unregister
	};

}));
