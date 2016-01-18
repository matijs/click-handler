# Declarative JS click handler

click-handler is a very small library that allows you to bind click events to [interactive HTML elements](https://developers.whatwg.org/content-models.html#interactive-content) in a declarative way.

## Example usage

### HTML

Declare handlers by adding a `data-handler="handler-name"` attribute. Multiple handlers can be added by separating them with white-space.

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>My app</title>
	<script src="click-handler.js"></script>
</head>
<body>
	<p><a href="/path/to/somewhere" data-handler="my-handler">example</a></p>
	<p><button type="button" data-handler="my-other-handler">other example</button></p>
	<p><button type="button" data-handler="my-handler my-other-handler">two handlers</button></p>
</body>
</html>
```

### JavaScript

You can register handlers individually:

```js
function myHandler(e) {
	e.preventDefault();
	console.log('clicked my handler');
}
clickHandler.register('my-handler', myHandler);

// or

clickHandler.register('my-other-handler', function(e) {
	e.preventDefault();
	console.log('clicked my other handler');
});
```

…or register an object of handlers in one go:

```js
var handlers = {
	'my-handler': function(e) {
		e.preventDefault();
		console.log('clicked my handler');
	},
	'my-other-handler': function(e) {
		e.preventDefault();
		console.log('clicked my other handler');
	}
}
clickHandler.register(handlers);

// or

clickHandler.register({
	'my-handler': function(e) {
		e.preventDefault();
		console.log('clicked my handler');
	},
	'my-other-handler': function(e) {
		e.preventDefault();
		console.log('clicked my other handler');
	}
});
```

Unregistering a handler can be done as follows:

```js
clickHandler.unregister('my-handler');
```

…or to unregister multiple handlers:

```js
clickHandler.unregister('my-handler', 'my-other-handler');
```

#### Options
click-handler for now has two configurable options:

```js
clickHandler.configure({
	// to always preventDefault, default: false
	alwaysPreventDefault: true,
	// number of levels to traverse up the DOM to find a handler, default: 2
	maxTraverse: 3
});
```

## Installation

You can install click-handler using [npm](https://npmjs.com/):

```bash
npm install click-handler [--save]
```
## License

click-handler is available under the [MIT license](http://opensource.org/licenses/MIT)
