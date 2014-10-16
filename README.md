## Usage

### Array of Strings

```
	<custom-select
		ng-model="selectedValues.string"
		ng-options="string for string in strings"
		placeholder="Select one of these string values...">
	</custom-select>
```

### Array of Objects

```
	<custom-select
		ng-model="selectedValues.object"
 		ng-options="object as object.name for object in objects"
 		placeholder="Select one of these object values...">
	</custom-select> 
```


## Working with the Source

### Installing Dependencies

After installing [Ruby](https://www.ruby-lang.org/en/) and [Bundler](http://bundler.io/), run `bundle install` from the project root to install the necessary Ruby gems.

After installing [Node.js](http://nodejs.org/), [NPM](https://npmjs.org/), and [Gulp](https://github.com/gulpjs/gulp), run `npm install` from the project root to install the necessary NPM package dependencies.

After installing [Bower](http://bower.io), run `bower install` from the project root to install the necessary Bower component dependencies.


### Compiling for Development

Run `gulp` to observe changes made to any `.coffee` files in the project, then respond by compiling/concatenating/copying the appropriate assets. The resulting files can be found in the `build` directory.


### Compiling for Production

Run 'gulp dist' to compile `angular-custom-select.min.js` for production.