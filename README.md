# Declarative JS click handler

click-handler is a very small library that allows you to bind click events to HTML elements in a declarative way.

## Example usage

### HTML

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
click-handler for now has one configurable option:

```js
clickHandler.configure({
	// to always preventDefault
	alwaysPreventDefault: true,
});
```

## Installation

You can install click-handler using [Bower](https://bower.io)

## License

click-handler is available under the [MIT license](http://opensource.org/licenses/MIT)
