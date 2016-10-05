# AngularJS Clearable Directive

An [AngularJS](http://angularjs.org/) directive for adding a clear button inside an input element.

## How to use angular-clearable

Just include `angular-clearable.js` after angularjs (jQuery is not required).
Then you will need to make sure you require `xngClearable` in your app module. That's it!

Using the `xng-clearable` directive is pretty simple:

```
<input type="text" ng-model="test" xng-clearable />
```

If you want change the position and size of the `x` then just use the provider:

```javascript
app.config([ 'xngClearableConfigProvider', function(xngClearableConfigProvider) {
        xngClearableConfigProvider.setTopPx = '1'; // how many px from top
        xngClearableConfigProvider.setLeftPx = 1.8; // how many px from left
        xngClearableConfigProvider.setFontSize = 0.6; // size of x
}]);
```

Sometimes is useful execute a function when the input is cleared then just pass a function name
as the directive value:

```html
<input type="text" ng-model="test" xng-clearable="myfun" />
```

The above expression can call `myfun()` from the controller when the directive is defined.


## Bower

You can install angular-clearable using [Bower](http://bower.io/):

```
bower install angular-clearable
```

## License.

This code is licensed under The MIT License (MIT).

## Credit

Original Author: Giacomo Antolini (aka Flocca)
