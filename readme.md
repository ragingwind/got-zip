# zip-got

> You've got a file zipped and then extracted


## Install

```
$ npm install --save zip-got
```


## Usage

```js
var zipGot = require('zip-got');
var zip = 'https://github.com/PolymerElements/polymer-starter-kit/releases/download/v1.0.3/polymer-starter-kit-light-1.0.3.zip';

zipGot(zip, var opts = {
	dest: './.tmp',
	extract: true,
	cleanup: true,
	exclude: ['__MACOSX/**']
};, function(err) {
	if (err) {
		console.error(err);
		return
	}

	// do unicorns & rainbows
});
```

## CLI

```
$ npm install --global zip-got
```

```
$ zip-got --help

  Usage
    zip-got <url> <exclude-patterns>... --cleanup --extract

  Example
    zip-got http://unicorns.com/unicorns.zip '__MACOSX/**' 'bower.json' 'README.md' 'LICENSE.md' --dest='./.tmp' --cleanup --extract

  Options
	--dest: path to download a zip file
	--cleanup: remove the zip file after extracting
	--extract: extract the zip file after downloading

	<url> url of zip file trying to download
	<exclude-patterns> pattern to exclude some of the files when it is extracted
```


## API

### zipGot(input, [options], [callback])

#### url

*Required*  
Type: `string`

url of the zip file trying  to download

#### options

##### dest

Type: `string`  

path for downloading a zip file

##### extract

Type: `bool`

If set, zip will be extracted after downloading

##### cleanup

Type: `bool`

If set, zip will be deleted after extract

##### exclude

Type: `string`

You can give [patterns](https://github.com/isaacs/minimatch) to exclude some of the files when it is extracted

## License

MIT © [Jimmy Moon](http://ragingwind.me)
