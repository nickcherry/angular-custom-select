## Usage

### Array of Strings

```
# Controller
$scope.selectedValues = {}
$scope.strings = ['Option A', 'Option B', 'Option C', 'Option D', 'Option E']	

# View
<custom-select
	ng-model="selectedValues.string"
	ng-options="string for string in strings"
	placeholder="Select one of these string values...">
</custom-select>
```
...will produce the following markup:

```
<div class="custom-select" ng-class="{ 'expanded': expanded }">
  <div class="placeholder option">
    <span class="value">
      Select one of these string values...
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option A
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option B
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option C
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option D
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option E
    </span>
  </div>
</div>	
```

### Array of Objects

```
# Controller
$scope.selectedValues = {}
$scope.objects = [
 	{ name: 'Option A' }
 	, { name: 'Option B' }
 	, { name: 'Option C' }
 	, { name: 'Option D' }
	, { name: 'Option E' }
]

# View
<custom-select
	ng-model="selectedValues.object"
	ng-options="object as object.name for object in objects"
	placeholder="Select one of these object values...">
</custom-select> 
```
...will produce the following markup:

```
<div class="custom-select" ng-class="{ 'expanded': expanded }">
  <div class="placeholder option">
    <span class="value">
      Select one of these string values...
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option A
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option B
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option C
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option D
    </span>
  </div>
  <div class="option">
    <span class="value">
      Option E
    </span>
  </div>
</div>
```

### Options

The following options can be configured by adding attributes to the `custom-select` element:

- __`select-class`__ specifies the class applied to the outermost custom dropdown element, defaults to `custom-select`.
- __`option-class`__ specifies the class applied to each option element, defaults to `option`.
- __`option-value-wrapper-class`__ specifies the class applied to the value text element for each option element, defaults to `value`.
- __`expanded-class`__ specifies the class applied to the outermost custom dropdown element when the menu is open, defaults to `expanded`.
- __`placeholder-class`__ specifies the class applied to the default/placeholder option element, defaults to `placeholder`.
- __`placeholder-label`__ specifies the text of the default/placeholder option, defaults to `Select a value...`.
- __`disabled-attribute`__ specifies the attribute to trigger a disabled state for options, only works for objects, defaults to `null`.
- __`disabled-class`__ specifies the class applied to disabled options, defaults to `disabled`.

## Working with the Source

### Installing Dependencies

After installing [Ruby](https://www.ruby-lang.org/en/) and [Bundler](http://bundler.io/), run `bundle install` from the project root to install the necessary Ruby gems.

After installing [Node.js](http://nodejs.org/), [NPM](https://npmjs.org/), and [Gulp](https://github.com/gulpjs/gulp), run `npm install` from the project root to install the necessary NPM package dependencies.

After installing [Bower](http://bower.io), run `bower install` from the project root to install the necessary Bower component dependencies.


### Compiling for Development

Run `gulp` to observe changes made to any `.coffee` files in the project, then respond by compiling/concatenating/copying the appropriate assets. The resulting files can be found in the `build` directory.


### Compiling for Production

Run 'gulp dist' to compile `angular-custom-select.min.js` for production.